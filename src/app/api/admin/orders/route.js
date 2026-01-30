import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MASTER_ADMINS, DEPARTMENT_ADMINS, ADMIN_EMAILS } from "@/lib/admins";
import JerseyOrder from "@/models/JerseyOrder";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();
  if (!ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  await connectDB();

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (MASTER_ADMINS.includes(email)) {
    // full access
  } else if (DEPARTMENT_ADMINS[email]) {
    query.department = DEPARTMENT_ADMINS[email];
  }

  const orders = await JerseyOrder.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(orders);
}
