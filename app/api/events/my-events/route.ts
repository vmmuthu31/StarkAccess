import { NextRequest, NextResponse } from "next/server";
import { getMyEvents } from "@global/controllers/eventController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";

export async function GET(req: NextRequest) {
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
