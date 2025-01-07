"use client";

import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {
  onBack: () => void;
  eventName: string;
  eventDescription: string;
  startDate: string;
  location: string;
  ticketPrice: number;
  maximumTickets: number;
};

const Page = ({
  onBack,
  eventName,
  eventDescription,
  startDate,
  ticketPrice,
  location,
  maximumTickets,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [bannerFileName, setBannerFileName] = useState("");
  const [logoFileName, setLogoFileName] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerFileName(e.target.files[0].name);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogoFileName(e.target.files[0].name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      if (currentEmail.trim() && isValidEmail(currentEmail.trim())) {
        setEmails([...emails, currentEmail.trim()]);
        setCurrentEmail("");
      }
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('description', eventDescription);
    formData.append('date', startDate);
    formData.append('location', location);
    formData.append('ticketPrice', ticketPrice.toString());
    formData.append('maxTickets', maximumTickets.toString());
    
    // Add the banner and logo files to the form data
    if (bannerFileName) {
      const bannerFile = document.getElementById("banner-upload")?.files?.[0];
      if (bannerFile) formData.append('banner', bannerFile);
    }
  
    if (logoFileName) {
      const logoFile = document.getElementById("logo-upload")?.files?.[0];
      if (logoFile) formData.append('logo', logoFile);
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/Events/create-event", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess("Event created successfully!");
      } else {
        setError(data.message || "An error occurred while creating the event.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="flex space-x-10 pt-6">
        <div className="space-y-4 w-[212px]">
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Basic Event Details
          </p>
          <p className="text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
            Ticketing & Registration
          </p>
          <p className="text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
            Customization & Media
          </p>
        </div>

        <div>
          <div className="space-y-1">
            <p>Event Banner Image</p>
            <div className="w-full p-2 rounded-[10px] bg-[#DAE7FC] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <motion.h1
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#4390F2] text-white rounded-[11px] w-fit flex justify-center items-center p-3 cursor-pointer"
                >
                  <label htmlFor="banner-upload" className="cursor-pointer">
                    Upload
                  </label>
                </motion.h1>
                <span className="text-[#4390F2]">
                  {bannerFileName || "No file selected"}
                </span>
              </div>

              <motion.label
                whileTap={{ scale: 0.9 }}
                htmlFor="banner-upload"
                className="cursor-pointer"
              >
                <MdOutlineFileUpload className="text-[#4390F2] size-6" />
              </motion.label>

              <input
                id="banner-upload"
                type="file"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onChange={handleBannerChange}
              />
            </div>
            <h1 className="text-black/50">
              Upload a banner image (recommended size: 1200x1200).
            </h1>
          </div>

          <div className="space-y-1 mt-6">
            <p>Company Logo</p>
            <div className="w-full p-2 rounded-[10px] bg-[#DAE7FC] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="bg-[#4390F2] text-white rounded-[11px] w-fit flex justify-center items-center p-3 cursor-pointer">
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    Upload
                  </label>
                </h1>
                <span className="text-[#4390F2]">
                  {logoFileName || "No file selected"}
                </span>
              </div>

              <label htmlFor="logo-upload" className="cursor-pointer">
                <MdOutlineFileUpload className="text-[#4390F2] size-6" />
              </label>

              <input
                id="logo-upload"
                accept=".png, .jpg, .jpeg, .svg"
                type="file"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
            <h1 className="text-black/50">
              Upload a Company Logo (recommended size: 1200x1200).
            </h1>
          </div>

          <div className="mt-6">
            <p className="text-lg">Add Guest</p>

            <div className="w-full">
              <div className="flex flex-wrap gap-2">
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

              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter email and press comma or enter"
                className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] mt-2"
              />
            </div>
          </div>
        </div>

        <div className="flex relative justify-center gap-4 text-xs md:text-base pt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="text-[#3581F1] gap-1 bg-white p-2 px-5 flex items-center border-2 border-[#78ABFC] rounded-[10px]"
          >
            Back
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePublish}
            disabled={loading}
            className="text-white bg-[#4390F2] w-fit p-2 px-5 flex justify-center items-center border-[3px] border-[#78ABFC] rounded-[10px]"
          >
            {loading ? "Publishing..." : "Publish Now"}
          </motion.button>
        </div>

        {success && (
          <div className="mt-4 text-green-500 text-center">
            <p>{success}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;