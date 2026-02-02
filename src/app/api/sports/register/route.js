import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import TeamRegistration from "@/models/TeamRegistration";

import { generateTeamDocx } from "@/lib/generateTeamDocx";
import { sendMailWithAttachment } from "@/lib/sendMailWithAttachment";

const VALID_COORDINATOR_CODES = {
  CS2025COORD: "Computer",
  EC2025COORD: "Electronics",
  ME2025COORD: "Mechanical",
  CE2025COORD: "Civil",
  EE2025COORD: "Electrical",
  IT2025COORD: "Information Technology",
  CH2025COORD: "Chemical",
  BT2025COORD: "Biotechnology",
  AD2025COORD: "Artificial Intelligence",
  FY2025COORD: "First Year",
};

export async function POST(req) {
  try {
    await connectDB();

    const { sport, department, category, coordinatorCode, players } =
      await req.json();

    if (!sport || !department || !category || !players?.length) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (!VALID_COORDINATOR_CODES[coordinatorCode]) {
      return NextResponse.json(
        { error: "Invalid coordinator code" },
        { status: 401 }
      );
    }

    // 🔒 PLAYER VALIDATION
    for (const p of players) {
      const jersey = await JerseyOrder.findOne({
        secretCode: p.secretCode,
        status: "approved",
      });

      if (!jersey)
        return NextResponse.json(
          { error: `Invalid secret code: ${p.secretCode}` },
          { status: 400 }
        );

      if (jersey.email !== p.email.toLowerCase())
        return NextResponse.json(
          { error: `Email mismatch for ${p.secretCode}` },
          { status: 400 }
        );

      if (jersey.department !== department)
        return NextResponse.json(
          { error: `Department mismatch for ${p.secretCode}` },
          { status: 400 }
        );

      const reused = await TeamRegistration.findOne({
        sport,
        "players.secretCode": p.secretCode,
      });

      if (reused)
        return NextResponse.json(
          { error: `Secret code already used for ${sport}` },
          { status: 409 }
        );
    }

    // 🧾 SAVE TEAM
    const captain = players[0];

    const team = await TeamRegistration.create({
      sport,
      department,
      category,
      coordinatorCode,
      captain: {
        name: `${captain.firstName} ${captain.lastName}`,
        email: captain.email,
        mobile: captain.mobile,
      },
      players,
      pdfGenerated: false,
    });

    const docxBuffer = await generateTeamDocx(team.toObject());

            await sendMailWithAttachment(team.captain.email, docxBuffer, {
                filename: "PARAKRAM_Team_Registration.docx",
                });



    team.pdfGenerated = true;
    await team.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("TEAM REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}
