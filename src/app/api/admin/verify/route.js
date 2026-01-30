import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import { MASTER_ADMINS, DEPARTMENT_ADMINS } from "@/lib/admins";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function generateSecretCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PAR";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = session.user.email.toLowerCase();

  await connectDB();

  const { orderId, action } = await req.json();

  if (!orderId || !action) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const order = await JerseyOrder.findById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const adminDepartment = DEPARTMENT_ADMINS[adminEmail];
  const isMaster = MASTER_ADMINS.includes(adminEmail);

  if (!isMaster && order.department !== adminDepartment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // ✅ APPROVE
  if (action === "approved") {
    if (!order.secretCode) {
      order.secretCode = generateSecretCode(); // 🔥 ONLY ONCE
    }
    order.status = "approved";
    order.verifiedBy = adminEmail;
    order.verifiedAt = new Date();
  }

  // ❌ REJECT
  if (action === "rejected") {
    order.status = "rejected";
    order.secretCode = undefined; // 🔥 CLEAR IT
    order.verifiedBy = adminEmail;
    order.verifiedAt = new Date();
  }

  await order.save();

  return NextResponse.json({ success: true });
}
