import { NextRequest, NextResponse } from "next/server";
import { createEvent, getAllEvents } from "@global/controllers/eventController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
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

    const body = await req.json();
    const result = await createEvent({
      ...body,
      userId: authReq.user.id,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authReq = await authenticateToken(req);
    if (!authReq) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    const events = await getAllEvents();
    return NextResponse.json({ events });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
