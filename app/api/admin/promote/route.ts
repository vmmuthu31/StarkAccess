import { NextRequest, NextResponse } from "next/server";
import { promoteUser } from "@global/controllers/adminController";
import { authenticateNextRequest } from "@global/middleware/authenticateToken";
import { isSuperAdmin } from "@global/middleware/roleMiddleware";
import { connectToDatabase } from "@global/lib/mongodb";

export async function PUT(req: NextRequest) {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error("Database connection failed");
  }
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
    const result = await promoteUser({
      email,
      promoterId: authReq.user.id,
      promoterName: authReq.user.name,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
