import { NextRequest, NextResponse } from "next/server";
import { updateEvent } from "@/global/controllers/eventOrganizerController";
import {
  authenticateToken,
  isAuthResponse,
} from "@/global/middleware/authenticateToken";
import { checkEventOrganizerOrCoOrganizer } from "@/global/middleware/roleMiddleware";

export async function PUT(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const authReq = await authenticateToken(req);
    if (!isAuthResponse(authReq)) {
      return authReq;
    }

    const event = await checkEventOrganizerOrCoOrganizer(
      params.eventId,
      authReq.user.id
    );
    if (!event) {
      return NextResponse.json(
        { message: "Access denied or event not found" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = await updateEvent({
      event,
      ...body,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
