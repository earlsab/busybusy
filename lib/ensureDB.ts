import dbConnect from "@/utils/dbConnect";

export async function ensureDBConnection() {
  try {
    await dbConnect();
  } catch (error) {
    throw new Error("Database connection failed");
  }
}
