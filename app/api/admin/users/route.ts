import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@global/controllers/userController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
import { isAdmin } from "@global/middleware/roleMiddleware";

export async function GET(req: NextRequest) {
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

    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
