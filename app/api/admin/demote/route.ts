import { NextRequest, NextResponse } from "next/server";
import { demoteUser } from "@global/controllers/adminController";
import { authenticateNextRequest } from "@global/middleware/authenticateToken";
import { isSuperAdmin } from "@global/middleware/roleMiddleware";

export async function PUT(req: NextRequest) {
  try {
    const authReq = await authenticateNextRequest(req);
    if (!authReq) {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }

    if (!isSuperAdmin(authReq)) {
      return NextResponse.json(
        { message: "Access denied. SuperAdmin only." },
        { status: 403 }
      );
    }

    const { email } = await req.json();
    const result = await demoteUser({
      email,
      demoterId: authReq.user.id,
      demoterName: authReq.user.name,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
