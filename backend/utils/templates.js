function registrationEmailTemplate(name) {
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

function eventCreationEmailTemplate(name, eventName) {
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

module.exports = {
  registrationEmailTemplate,
  eventCreationEmailTemplate,
};
