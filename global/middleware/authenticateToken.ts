import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload;
}

export interface AuthResponse {
  user: {
    id: string;
    role: string;
    name: string;
  };
}

export const authenticateToken = async (
  req: NextRequest
): Promise<AuthResponse | NextResponse> => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Access Denied. No token provided." },
      { status: 401 }
    );
  }

  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        resolve(
          NextResponse.json(
            { message: "Invalid or expired token." },
            { status: 403 }
          )
        );
      }
      const user = decoded as CustomJwtPayload;
      resolve({ user: { id: user.id, role: user.role, name: user.name } });
    });
  });
};

export default authenticateToken;

export async function authenticateNextRequest(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;
    return { user: { id: decoded.id, role: decoded.role, name: decoded.name } };
  } catch (err) {
    return null;
  }
}

export function isAuthResponse(
  response: AuthResponse | NextResponse
): response is AuthResponse {
  return "user" in response;
}
