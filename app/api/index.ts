import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Define the allowed origins
const allowedOrigins = ["https://www.starkaccess.xyz", "http://localhost:3000"];

// A helper function to establish a MongoDB connection.
// This pattern helps prevent multiple connections when in development mode.
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const dbURI = process.env.MONGODBURI as string;
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle CORS by checking the request origin
  const origin = req.headers.origin || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "false");
  }

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).end();
    return;
  }

  // Connect to MongoDB before proceeding
  await dbConnect();

  // Define the behavior for a GET request
  if (req.method === "GET") {
    const serverStatus = {
      status: "Server is running smoothly 🚀",
      uptime: process.uptime(),
      timestamp: new Date().toLocaleString(),
      message: "Welcome to the StarkNet Event Ticketing Platform API 🎉",
    };
    res.status(200).json(serverStatus);
    return;
  }

  // Return a 405 error for any unsupported HTTP methods
  res.status(405).json({ error: "Method not allowed" });
};

export default handler;
