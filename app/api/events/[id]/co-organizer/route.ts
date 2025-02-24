import { NextRequest, NextResponse } from "next/server";
import {
  addCoOrganizer,
  removeCoOrganizer,
} from "@global/controllers/eventOrganizerController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
import { checkEventOrganizer } from "@global/middleware/roleMiddleware";
import { connectToDatabase } from "@global/lib/mongodb";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq;
    }

    const event = await checkEventOrganizer(params.id, authReq.user.id);
    if (!event) {
      return NextResponse.json(
        { message: "Access denied or event not found" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = await addCoOrganizer({
      eventId: params.id,
      coOrganizerEmail: body.coOrganizerEmail,
      event,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq;
    }

    const event = await checkEventOrganizer(params.id, authReq.user.id);
    if (!event) {
      return NextResponse.json(
        { message: "Access denied or event not found" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = await removeCoOrganizer({
      eventId: params.id,
      coOrganizerEmail: body.coOrganizerEmail,
      event,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
