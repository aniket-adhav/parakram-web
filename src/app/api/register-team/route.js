import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TeamRegistration from "@/models/TeamRegistration";
import JerseyOrder from "@/models/JerseyOrder";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      sport,
      department,
      category,
      captain,
      players,
    } = data;

    // Save team
    const team = await TeamRegistration.create({
      sport,
      department,
      category,
      captain,
      players,
    });

    // Mark sport as used for each player
    for (const player of players) {
      await JerseyOrder.updateOne(
        { secretCode: player.secretCode },
        { $addToSet: { usedSports: sport } }
      );
    }

    return NextResponse.json({
      success: true,
      teamId: team._id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Team registration failed" },
      { status: 500 }
    );
  }
}
