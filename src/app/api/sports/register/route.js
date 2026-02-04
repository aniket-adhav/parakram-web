import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import TeamRegistration from "@/models/TeamRegistration";
import { generateFilledPdf } from "@/lib/generateFilledPdf";
import { sendMailWithAttachment } from "@/lib/sendMailWithAttachment";
import crypto from "crypto";

/* 🔑 SAME CODES AS FRONTEND */
const COORDINATOR_CODES = {
  "FY-K9X2Q": "First Year (All Departments)",
  "CS-FHA45": "Computer",
  "AI-7Q9MZ": "AIDS",
  "EE-X2A8Q": "Electrical",
  "CV-9MZX1": "Civil",
  "ME-RZ5A9": "Mechanical",
  "EC-XM2Z9": "ENTC",
  "ST-A2XZQ": "STR",
  "AR-Z9X2M": "A&R",
  "IN-ZX9QA": "INSTRU",
  "IT-QA2MZ": "IT",
};

export async function POST(req) {
  try {
    await connectDB();

    const { players, coordinatorCode, sport } = await req.json();

    /* ================= BASIC CHECKS ================= */

    if (!sport) {
      return NextResponse.json({ error: "Sport is required" }, { status: 400 });
    }

    if (!coordinatorCode || !COORDINATOR_CODES[coordinatorCode]) {
      return NextResponse.json(
        { error: "Invalid coordinator code" },
        { status: 401 }
      );
    }

    if (!players || players.length === 0) {
      return NextResponse.json(
        { error: "At least one player required" },
        { status: 400 }
      );
    }

    const department = COORDINATOR_CODES[coordinatorCode];

    /* ================= UNIQUE SECRET CODES ================= */

    const secretSet = new Set();
    for (const p of players) {
      if (!p.secretCode) {
        return NextResponse.json(
          { error: "Secret code missing for a player" },
          { status: 400 }
        );
      }

      if (secretSet.has(p.secretCode)) {
        return NextResponse.json(
          { error: `Duplicate secret code: ${p.secretCode}` },
          { status: 400 }
        );
      }

      secretSet.add(p.secretCode);
    }

    /* ================= VERIFY PLAYERS ================= */

    for (const p of players) {
      const jersey = await JerseyOrder.findOne({
        secretCode: p.secretCode,
        status: "approved",
      });

      if (!jersey) {
        return NextResponse.json(
          { error: `Invalid or unapproved secret code: ${p.secretCode}` },
          { status: 400 }
        );
      }

      if (jersey.department !== department) {
        return NextResponse.json(
          {
            error: `Secret code ${p.secretCode} does not belong to ${department}`,
          },
          { status: 400 }
        );
      }
    }

    /* ================= CAPTAIN EMAIL ================= */

    const captainEmail = players[0]?.email;
    if (!captainEmail) {
      return NextResponse.json(
        { error: "Captain email is required" },
        { status: 400 }
      );
    }

    /* ================= FORM CODE ================= */

    const formCode = `PRK-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;

    /* ================= SAVE TEAM (🔥 FIXED) ================= */

    let sportDoc = await TeamRegistration.findOne({ sport });

    if (!sportDoc) {
      sportDoc = await TeamRegistration.create({
        sport,
        teams: [],
      });
    }

    sportDoc.teams.push({
      formCode,
      players,
      pdfGenerated: false,
    });

    await sportDoc.save();

    /* ================= PDF ================= */

    const { pdfBytes, formId } = await generateFilledPdf({ players, department });

    /* ================= EMAIL ================= */

    await sendMailWithAttachment(
      captainEmail,
      pdfBytes,
      sport,       // ✅ real sport name
      department   // ✅ real department name
    );

    // mark last team pdfGenerated = true
    sportDoc.teams[sportDoc.teams.length - 1].pdfGenerated = true;
    await sportDoc.save();

    return NextResponse.json(
      {
        success: true,
        formCode,
        department,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}
