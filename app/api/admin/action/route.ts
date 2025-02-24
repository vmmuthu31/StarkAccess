import { NextRequest, NextResponse } from "next/server";
import {
  createAdminAction,
  getAdminActionsData,
} from "@global/controllers/adminController";
import { authenticateNextRequest } from "@global/middleware/authenticateToken";
import { isSuperAdmin } from "@global/middleware/roleMiddleware";
import { connectToDatabase } from "@global/lib/mongodb";

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { action, targetId, targetType, description } = body;

    const adminAction = await createAdminAction({
      userId: authReq.user.id,
      action,
      targetId,
      targetType,
      description,
    });

    return NextResponse.json(
      { message: "Admin action logged successfully", adminAction },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    const adminActions = await getAdminActionsData();
    if (!adminActions || adminActions.length === 0) {
      return NextResponse.json(
        { message: "No admin actions found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ adminActions });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
