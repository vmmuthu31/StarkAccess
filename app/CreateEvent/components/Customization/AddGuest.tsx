import React, { useState } from "react";

type Props = {};

const AddGuest = (props: Props) => {
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");

  // Handle key press (e.g., adding an email when pressing Enter or comma)
  const Handlekeydown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      if (currentEmail.trim() && Isvalidemail(currentEmail.trim())) {
        setEmails([...emails, currentEmail.trim()]);
        setCurrentEmail("");
      }
    }
  };

  // Validate the email format
  const Isvalidemail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle input change
  const Handlemailchange = (e) => {
    setCurrentEmail(e.target.value);
  };

  // Remove an email from the list
  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="text-lg">Add Guest</p>

      {/* Multi-email input */}
      <div className="w-full">
        <div className="flex flex-wrap gap-2">
          {/* Display entered emails */}
          {emails.map((email, index) => (
            <span
              key={index}
              className="bg-[#4390F2] text-white px-2 py-1 rounded-md flex items-center"
            >
              {email}
              <button
                onClick={() => removeEmail(index)}
                className="ml-2 text-sm text-white cursor-pointer"
              >
                x
              </button>
            </span>
          ))}
        </div>

        {/* Input for adding more emails */}
        <input
          type="email"
          value={currentEmail}
          onChange={Handlemailchange}
          onKeyDown={Handlekeydown}
          placeholder="Enter email and press comma or enter"
          className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] mt-2"
        />
      </div>
    </div>
  );
};

export default AddGuest;
