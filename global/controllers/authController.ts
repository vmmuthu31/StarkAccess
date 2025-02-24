import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendEmail, registrationEmailTemplate } from "../utils/Mailer";

const generateToken = (user: any): string => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
  walletAddress?: string;
}) {
  const { name, email, password, role, walletAddress } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    walletAddress,
  });
  await user.save();

  const subject = "Welcome to StarkNet!";
  const html = registrationEmailTemplate(name);
  await sendEmail(email, subject, html);

  return {
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      walletAddress: user.walletAddress,
    },
  };
}

export async function login(data: { email: string; password: string }) {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);
  return { message: "Login successful", user, token };
}

export async function changePassword(data: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) {
  const { userId, currentPassword, newPassword } = data;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Incorrect current password");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return { message: "Password changed successfully" };
}
