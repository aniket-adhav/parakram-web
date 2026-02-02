import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Coordinator from "@/models/Coordinator";

export async function POST(req) {
  try {
    await connectDB();
    const { code } = await req.json();

    const coordinator = await Coordinator.findOne({
      code: code.toUpperCase(),
    });

    if (!coordinator) {
      return NextResponse.json(
        { error: "Invalid coordinator code" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      department: coordinator.department,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Coordinator verification failed" },
      { status: 500 }
    );
  }
}
