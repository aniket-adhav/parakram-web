import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import ExcelJS from "exceljs";
import archiver from "archiver";
import { PassThrough } from "stream";

export async function GET() {
  await connectDB();

  const orders = await JerseyOrder.find().lean();

  if (!orders.length) {
    return NextResponse.json(
      { message: "No orders found" },
      { status: 404 }
    );
  }

  // Group orders by department
  const grouped = {};
  orders.forEach(order => {
    const dept = order.department || "Unknown";
    if (!grouped[dept]) grouped[dept] = [];
    grouped[dept].push(order);
  });

  const zipStream = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(zipStream);

  // Create Excel file per department
  for (const dept in grouped) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Orders");

    sheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Jersey Name", key: "jerseyName", width: 15 },
      { header: "Jersey No", key: "jerseyNo", width: 10 },
      { header: "Size", key: "size", width: 10 },
      {header: "Secret Code", key: "secretCode", width: 10},
      { header: "Department", key: "department", width: 20},
      { header: "Payment ID", key: "paymentId", width: 25 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    grouped[dept].forEach(o => sheet.addRow(o));

    const buffer = await workbook.xlsx.writeBuffer();

    const safeName = dept.replace(/\s+/g, "_");
    archive.append(buffer, { name: `${safeName}.xlsx` });
  }

  archive.finalize();

  return new NextResponse(zipStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=jersey-orders.zip",
    },
  });
}
