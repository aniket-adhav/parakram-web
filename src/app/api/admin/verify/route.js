import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import { MASTER_ADMINS, DEPARTMENT_ADMINS } from "@/lib/admins";

function generateSecretCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PAR";

  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}


export async function POST(req) {
  await connectDB();

  const { orderId, action, adminEmail } = await req.json();

  if (!orderId || !action || !adminEmail) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const order = await JerseyOrder.findById(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // 🔐 Department restriction
  const adminDepartment = DEPARTMENT_ADMINS[adminEmail];
  const isMaster = MASTER_ADMINS.includes(adminEmail);

  if (!isMaster && order.department !== adminDepartment) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // ✅ APPROVE
  if (action === "approved") {
    order.status = "approved";
    order.secretCode = generateSecretCode(); // 🔥 REQUIRED
    order.verifiedBy = adminEmail;
    order.verifiedAt = new Date();
  }

  // ❌ REJECT
  if (action === "rejected") {
    order.status = "rejected";
    order.verifiedBy = adminEmail;
    order.verifiedAt = new Date();
  }

  await order.save(); // 🔥 WILL NOT FAIL NOW

  return NextResponse.json({ success: true });
}