import { NextRequest, NextResponse } from "next/server";
import { deleteAdminAction } from "@global/controllers/adminController";
import { authenticateNextRequest } from "@global/middleware/authenticateToken";
import { isSuperAdmin } from "@global/middleware/roleMiddleware";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    await deleteAdminAction(params.id);
    return NextResponse.json({ message: "Action deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
