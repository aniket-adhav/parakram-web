import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import JerseyOrder from "@/models/JerseyOrder";
import { connectDB } from "@/lib/db";

export async function generateExcelForDepartment(department) {
  await connectDB();

  const orders = await JerseyOrder.find({ department });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(department);

  sheet.columns = [
    { header: "Name", key: "name" },
    {header: "Phone No", key: "phone No"},
    { header: "Email", key: "email" },
    { header: "Jersey Name", key: "jerseyName" },
    { header: "Jersey No", key: "jerseyNo" },
    { header: "Size", key: "size" },
    { header: "Secret Code", key: "secretCode" },
    { header: "Payment ID", key: "paymentId" }
  ];

  orders.forEach(o => sheet.addRow(o));

  const dir = path.join(process.cwd(), "exports");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  await workbook.xlsx.writeFile(
    `${dir}/${department.replace(" ", "_")}.xlsx`
  );
}
