"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UploadBanner from "./UploadBanner";
import UploadLogo from "./UploadLogo";
import AddGuest from "./AddGuest";

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

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/api/Events/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify({
          name: eventName,
          description: eventDescription,
          date: startDate, // Ensure it's in ISO format if required by the backend
          location,
          ticketPrice,
          maxTickets: maximumTickets,
        }),
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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(location);
    console.log(token);
  }, []);

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
          <UploadBanner />
          <UploadLogo />
          <AddGuest />
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
