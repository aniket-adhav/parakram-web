import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import ExcelJS from "exceljs";
import JSZip from "jszip";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch all orders FIRST
    const orders = await JerseyOrder.find({status:"approved"}).lean();

    if (!orders.length) {
      return NextResponse.json(
        { message: "No orders found" },
        { status: 404 }
      );
    }

    // ✅ Group by department
    const grouped = {};
    for (const order of orders) {
      const dept = order.department || "Unknown";
      if (!grouped[dept]) grouped[dept] = [];
      grouped[dept].push(order);
    }

    // ✅ Create ZIP in memory
    const zip = new JSZip();

    // ✅ Create Excel per department (SYNC + SAFE)
    for (const dept of Object.keys(grouped)) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Orders");

      sheet.columns = [
        { header: "Name", key: "name", width: 20 },
        { header: "Email", key: "email", width: 30 },
        { header: "Phone", key: "phone", width: 15 },
        { header: "Jersey Name", key: "jerseyName", width: 15 },
        { header: "Jersey No", key: "jerseyNo", width: 10 },
        { header: "Size", key: "size", width: 10 },
        {header: "Collar", key: "collar", width: 20},
        { header: "Secret Code", key: "secretCode", width: 18 },
        { header: "Department", key: "department", width: 20 },
        { header: "Created At", key: "createdAt", width: 22 },
      ];

      grouped[dept].forEach((o) => {
        sheet.addRow({
          name: o.name,
          email: o.email,
          phone: o.phone,
          jerseyName: o.jerseyName,
          jerseyNo: o.jerseyNo,
          size: o.size,
          collar: o.collar,
          secretCode: o.secretCode,
          department: o.department,
          createdAt: new Date(o.createdAt).toLocaleString(),
        });
      });

      // ✅ IMPORTANT: fully resolve Excel
      const excelBuffer = await workbook.xlsx.writeBuffer();

      const safeName = dept.replace(/[^\w]/g, "_");
      zip.file(`${safeName}.xlsx`, excelBuffer);
    }

    // ✅ FINAL ZIP BUFFER
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="jersey-orders.zip"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export jersey orders" },
      { status: 500 }
    );
  }
}
