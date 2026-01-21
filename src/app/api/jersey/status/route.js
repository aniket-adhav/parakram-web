import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";

export async function GET(req) {
  await connectDB();

  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ ordered: false });
  }

  const order = await JerseyOrder.findOne({ email });

  return NextResponse.json({
    ordered: !!order,
    orderDetails: order || null,
  });
}