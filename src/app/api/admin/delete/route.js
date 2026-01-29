import cloudinary from "@/lib/cloudinary";
import JerseyOrder from "@/models/JerseyOrder";

export async function POST(req) {
  const { orderId } = await req.json();

  const order = await JerseyOrder.findById(orderId);

  if (order?.screenshotPublicId) {
    await cloudinary.uploader.destroy(order.screenshotPublicId);
  }

  await JerseyOrder.findByIdAndDelete(orderId);

  return Response.json({ success: true });
}