import { NextRequest, NextResponse } from "next/server";
import { register } from "@/global/controllers/authController";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await register(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
