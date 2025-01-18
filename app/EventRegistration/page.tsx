"use client"; // Ensure the file is marked as a client component

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/backend/constants";
import Image from "next/image";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

const EventRegistration = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/Events/event/${eventId}`
          );
          setEvent(response.data); // Set the event data
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [eventId]);

  if (!eventId) {
    return <div>Loading event...</div>; // Early return if eventId is missing
  }

  if (!event) {
    return <div>Loading event details...</div>; // Show loading state until event data is fetched
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <Image src={event.image} alt={event.name} width={100} height={100} />
    </div>
  );
};

export default EventRegistration;
