import { NextRequest, NextResponse } from "next/server";
import { getMyEvents } from "@global/controllers/eventController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
import { connectToDatabase } from "@global/lib/mongodb";

export async function GET(req: NextRequest) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq;
    }

    const events = await getMyEvents(authReq.user.id);
    return NextResponse.json({
      message: "Events retrieved successfully",
      events,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
