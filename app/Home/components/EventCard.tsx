"use client"; // Ensure the file is marked as a client component

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const EventRegistration = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const { eventId } = router.query; // Retrieve eventId from query parameters

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/Events/event/${eventId}`);
          setEvent(response.data); // Set the event data
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [eventId]); // Fetch event details when eventId changes

  if (!eventId) {
    return <div>Loading event...</div>; // Early return if eventId is missing
  }

  if (!event) {
    return <div>Loading event details...</div>; // Show loading state until event data is fetched
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <img src={event.image} alt={event.title} />
    </div>
  );
};

export default EventRegistration;
