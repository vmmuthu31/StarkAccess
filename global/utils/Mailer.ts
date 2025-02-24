import nodemailer from "nodemailer";

// Create transporter object for nodemailer with Gmail configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define the function to send an email
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  cc?: string
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    cc,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email", error);
  }
}

// Template for the registration email
export function registrationEmailTemplate(name: string): string {
  return `
    <h2>Welcome to StarkNet!</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering on StarkNet Event Ticketing Platform.</p>
    <p>We are excited to have you on board. Start exploring events, and feel free to create your own events too!</p>
    <p>Best regards,</p>
    <p>The StarkNet Team</p>
    <hr />
    <p>If you didn’t sign up for this account, please ignore this email.</p>
  `;
}

// Template for the event creation email
export function eventCreationEmailTemplate(
  name: string,
  eventName: string
): string {
  return `
    <h2>Your Event Has Been Created!</h2>
    <p>Hello ${name},</p>
    <p>Thank you for creating the event "<strong>${eventName}</strong>" on StarkNet Event Ticketing Platform.</p>
    <p>Your event is now live, and users can start registering for it. You can manage your event details and track registrations through your dashboard.</p>
    <p>Best regards,</p>
    <p>The StarkNet Team</p>
    <hr />
    <p>If you have any questions or need help, contact us at starknethhofficial@gmail.com</p>
  `;
}
