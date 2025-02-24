import { NextRequest, NextResponse } from "next/server";
import { suspendUser } from "@/global/controllers/userController";
import {
  authenticateToken,
  isAuthResponse,
} from "@/global/middleware/authenticateToken";
import { isAdmin } from "@/global/middleware/roleMiddleware";

export async function POST(req: NextRequest) {
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq;
    }

    if (!isAdmin(authReq.user)) {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = await suspendUser({
      email: body.email,
      suspensionDuration: body.suspensionDuration,
      adminId: authReq.user.id,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
