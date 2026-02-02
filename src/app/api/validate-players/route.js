import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";

export async function POST(req) {
  try {
    await connectDB();
    const { sport, department, players } = await req.json();

    for (const player of players) {
      const order = await JerseyOrder.findOne({
        email: player.email.toLowerCase(),
        secretCode: player.secretCode,
        status: "approved",
      });

      if (!order) {
        return NextResponse.json(
          { error: `Jersey not verified for ${player.email}` },
          { status: 400 }
        );
      }

      if (order.department !== department) {
        return NextResponse.json(
          { error: `Department mismatch for ${player.email}` },
          { status: 400 }
        );
      }

      if (order.usedSports.includes(sport)) {
        return NextResponse.json(
          { error: `${player.email} already registered in ${sport}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Player validation failed" },
      { status: 500 }
    );
  }
}
