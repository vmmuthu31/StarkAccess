import { NextRequest, NextResponse } from "next/server";
import { getUserById, deleteUser } from "@global/controllers/userController";
import {
  authenticateToken,
  isAuthResponse,
} from "@global/middleware/authenticateToken";
import { isAdmin } from "@global/middleware/roleMiddleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const user = await getUserById(params.id);
    return NextResponse.json({ user });
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

    await deleteUser({
      userId: params.id,
      adminId: authReq.user.id,
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: error.status || 500 }
    );
  }
}
