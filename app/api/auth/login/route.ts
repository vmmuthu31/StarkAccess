import { NextRequest, NextResponse } from "next/server";
import { login } from "@global/controllers/authController";
import { connectToDatabase } from "@global/lib/mongodb";

export async function POST(req: NextRequest) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
  try {
    const body = await req.json();
    const result = await login(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
