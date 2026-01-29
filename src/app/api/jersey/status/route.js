import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";

export async function GET(req) {
  try {
    await connectDB();
  } catch (e) {
    return NextResponse.json({ error: "DB down" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(null);
  }

  const order = await JerseyOrder
    .findOne({ email })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(order || null);
}