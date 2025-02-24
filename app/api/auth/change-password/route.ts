import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "@global/controllers/authController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";

export async function PUT(req: NextRequest) {
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq; // Returns NextResponse with error
    }

    const body = await req.json();
    const result = await changePassword({
      userId: authReq.user.id,
      ...body,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
