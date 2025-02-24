import type { NextApiRequest, NextApiResponse } from "next";
import { createAdminAction } from "@/global/controllers/adminController";
import { authenticateToken } from "@/global/middleware/authenticateToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Convert Express middleware to async function
    await new Promise((resolve, reject) => {
      authenticateToken(req as any, res as any, (error?: any) => {
        if (error) reject(error);
        else resolve(true);
      });
    });

    await createAdminAction(req as any, res as any, () => {});
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
