import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import { generateSecretCode } from "@/lib/generateSecretCode";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // ✅ email is REQUIRED
    if (!data.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // ❌ Prevent multiple jersey purchases
    const already = await JerseyOrder.findOne({ email: data.email });
    if (already) {
      return NextResponse.json(
        { message: "You already purchased a jersey" },
        { status: 409 }
      );
    }

    // 🔐 Generate secret code
    const secretCode = generateSecretCode();

    await JerseyOrder.create({
      ...data,
      secretCode,
      paymentStatus: "SUCCESS",
    });

    // ✅ Return secret code to frontend
    return NextResponse.json(
      {
        success: true,
        secretCode,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("JERSEY ORDER ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
