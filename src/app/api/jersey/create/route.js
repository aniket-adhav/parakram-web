import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import JerseyOrder from "@/models/JerseyOrder";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const form = await req.formData();

    const email = form.get("email");
    const name = form.get("name");
    const phone = form.get("phone");
    const jerseyName = form.get("jerseyName");
    const jerseyNo = Number(form.get("jerseyNo"));
    const size = form.get("size");
    const collar = form.get("collar");
    const department = form.get("department");
    const utrNo = form.get("utrNo");
    const screenshot = form.get("screenshot");

    if (
      !email ||
      !name ||
      !phone ||
      !jerseyName ||
      Number.isNaN(jerseyNo) ||
      !size ||
      !collar ||
      !department ||
      !utrNo ||
      !screenshot
    ) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    // ❌ BLOCK only pending / approved
    const activeOrder = await JerseyOrder.findOne({
      email,
      status: { $in: ["pending", "approved"] },
    });

    if (activeOrder) {
      return NextResponse.json(
        { error: "You already have an active order" },
        { status: 409 }
      );
    }

    // ❌ UTR reuse protection
    const utrUsed = await JerseyOrder.findOne({ utrNo });
    if (utrUsed) {
      return NextResponse.json(
        { error: "This UTR is already used. Please make a new payment." },
        { status: 409 }
      );
    }

    // ✅ Upload to Cloudinary
    const buffer = Buffer.from(await screenshot.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "parakram/jerseys" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    const order = await JerseyOrder.create({
      email,
      name,
      phone,
      jerseyName,
      jerseyNo,
      size,
      collar,
      department,
      utrNo,
      screenshotUrl: uploadResult.secure_url,
      screenshotPublicId: uploadResult.public_id,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);

    return NextResponse.json(
      { error: "Order submission failed" },
      { status: 500 }
    );
  }
}