import dbConnect from "@/utils/dbConnect";

export async function ensureDBConnection() {
  try {
    await dbConnect();
  } catch {
    throw new Error("Database connection failed");
  }
}
