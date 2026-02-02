import nodemailer from "nodemailer";

export async function sendMailWithAttachment(to, buffer, options) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"PARAKRAM" <${process.env.MAIL_USER}>`,
    to,
    subject: "PARAKRAM Team Registration",
    text: "Attached is your official team registration form. Please print and bring it on match day.",
    attachments: [
      {
        filename: options.filename,
        content: buffer,
      },
    ],
  });
}
