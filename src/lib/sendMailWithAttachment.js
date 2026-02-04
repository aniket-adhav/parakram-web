// src/lib/sendMailWithAttachment.js
import nodemailer from "nodemailer";

export async function sendMailWithAttachment(
  email,
  pdfBuffer,
  sportName,
  department
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // ✅ HARD SAFETY (THIS FIXES YOUR ERROR)
  const safeSport =
    typeof sportName === "string"
      ? sportName.toUpperCase()
      : String(sportName?.name || "SPORT").toUpperCase();

  const safeDepartment =
    typeof department === "string"
      ? department
      : String(department || "DEPARTMENT");

  await transporter.sendMail({
    from: `"PARAKRAM 2026" <${process.env.MAIL_USER}>`,

    // Captain + Team Parakram record
    to: email,
    cc: "viveknikam22104@gmail.com",

    subject: `PARAKRAM 2026 – ${safeSport} TEAM REGISTRATION (${safeDepartment})`,

    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #111;">
        <p>Dear Participant,</p>

        <p>
          Your team registration for <b>${safeSport}</b> under the
          <b>${safeDepartment}</b> department has been
          <b>successfully submitted</b> for <b>PARAKRAM 2026</b>.
        </p>

        <p>
          The filled registration form is attached with this email.
        </p>

        <p><b>IMPORTANT INSTRUCTIONS:</b></p>
        <ul>
          <li>Fill in all remaining details clearly.</li>
          <li>Take all required signatures.</li>
          <li>Submit a printed hard copy to the <b>Vice-President (Shubham Pingle)</b>.</li>
        </ul>

        <p><b>RULES:</b></p>
        <ul>
          <li>No player changes will be allowed after submission.</li>
          <li>Only listed players are eligible to play.</li>
          <li>Any illegal activity or mismatch will lead to <b>team disqualification</b>.</li>
        </ul>

        <p>Regards,<br/><b>Team PARAKRAM 2026</b></p>
      </div>
    `,

    attachments: [
      {
        filename: "PARAKRAM_2026_Team_Registration.pdf",
        content: pdfBuffer, // ✅ Buffer only
      },
    ],
  });
}
