"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../Home/components/EventCard"; // Import EventCard component
import Footer from "../components/Footer"; // Import Footer
import Header from "../components/Header"; // Import Header
import { BACKEND_URL } from "@/backend/constants";

type Event = {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  logo: string;
};

const Page = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(
          `${BACKEND_URL}/api/Events/all-events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserRole(userData.data.user.role); // Set user role
        setEvents(response.data.events);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };

  if (loading) return <div className="text-center py-4">Loading events...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="min-h-screen text-white custom-cursor">
      {/* White background extending throughout the page */}
      <div className="bg-[#EDF3FD] min-h-screen w-full">
        {/* Section with the background image limited to screen height */}
        <div className="bg-[url('/BgImg1.webp')] bg-cover bg-center bg-no-repeat ">
          <div className="py-3 md:py-6">
            <Header />
            <div className="flex justify-center pt-10 md:pt-16 px-2 md:px-0">
              <div className="space-y-3">
                <div className="flex justify-center items-center text-xl gap-2">
                  <h1 className="text-lg">Explore On-chain Events</h1>
                </div>
                <div className="text-center text-xl md:text-4xl lg:text-5xl">
                  <p className=" ">Discover Seamless Event Management</p>
                  <p className="bg-gradient-to-l from-black/10 border-r-4 p-2 border-r-black w-fit mx-auto">
                    {" "}
                    at Your Events with Starknet
                  </p>
                </div>
                <h1 className="text-center text-sm md:text-lg">
                  Explore, connect, and engage with events like never before!
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Event Cards Section */}
        <div className="pt-10 pb-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                userRole={userRole}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Page;
