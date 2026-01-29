import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MASTER_ADMINS, DEPARTMENT_ADMINS, ADMIN_EMAILS } from "@/lib/admins";
import JerseyOrder from "@/models/JerseyOrder";

export async function GET(req) {
  const email = req.headers.get("x-admin-email")?.toLowerCase().trim();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  // 🔒 Block non-admins
  if (!email || !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const query = {};

  // 🟢 STATUS FILTER
  if (status && status !== "all") {
    query.status = status;
  }

  // 🟢 MASTER ADMIN → see all
  if (MASTER_ADMINS.includes(email)) {
    // no department filter
  }
  // 🔴 DEPARTMENT ADMIN → restricted
  else if (DEPARTMENT_ADMINS[email]) {
    query.department = DEPARTMENT_ADMINS[email];
  }

  const orders = await JerseyOrder.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(orders);
}