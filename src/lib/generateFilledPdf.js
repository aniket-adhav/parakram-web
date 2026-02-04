import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/* 🔑 Department → Short Code */
const DEPT_SHORT = {
  "First Year (All Departments)": "FY",
  "Computer": "CS",
  "AIDS": "AI",
  "Electrical": "EE",
  "Civil": "CV",
  "Mechanical": "ME",
  "ENTC": "EC",
  "STR": "ST",
  "A&R": "AR",
  "INSTRU": "IN",
  "IT": "IT",
};

/* ✅ FORM ID = DEPT + FORM + RANDOM */
function generateFormId(department = "PARAKRAM") {
  const deptCode = DEPT_SHORT[department] || "PRK";

  const randomCode = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return `${deptCode}-FORM-${randomCode}`;
}

export async function generateFilledPdf({ players, department }) {
  const pdfPath = path.join(
    process.cwd(),
    "src/templates/PARAKRAM_REGISTRATION.pdf"
  );

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  /* 🔤 Fonts */
  const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const draw = (text, x, y, size = 9, font = normalFont) => {
    if (!text) return;
    page.drawText(String(text), {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  /* 🔹 FORM ID (TOP-RIGHT, BOLD, CLEAN) */
  const formId = generateFormId(department);
  draw(
    formId,
    470,   // RIGHT
    790,   // UP
    9,
    boldFont
  );

  /* 🔒 PLAYERS TABLE (UNCHANGED – Y AXIS LOCKED) */
  const startY = 399;
  const rowGap = 19;

  players.forEach((p, i) => {
    const y = startY - i * rowGap;

    draw(p.secretCode?.toUpperCase(), 79, y);
    draw(
      `${p.firstName} ${p.lastName}`.toUpperCase(),
      215,
      y
    );
    draw(p.year, 375, y);
    draw(p.mobile, 465, y);
  });

  return {
    pdfBytes: await pdfDoc.save(), // ✅ BUFFER ONLY
    formId,                        // ✅ DEPT-PREFIXED FORM ID
  };
}
