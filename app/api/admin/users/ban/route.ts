import { NextRequest, NextResponse } from "next/server";
import { banUser } from "@global/controllers/userController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
import { isAdmin } from "@global/middleware/roleMiddleware";
import { connectToDatabase } from "@global/lib/mongodb";

export async function POST(req: NextRequest) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
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
    const result = await banUser({
      email: body.email,
      adminId: authReq.user.id,
      adminName: authReq.user.name,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
