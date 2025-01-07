"use client"; // Ensure this is at the top of your file

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const EventRegistration = () => {
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    // Wait for eventId to be available before fetching data
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/Events/event/${eventId}`);
          setEvent(response.data);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [eventId]); // Depend on eventId to trigger the effect when it changes

  if (!eventId) {
    return <div>Loading event...</div>; // Return early if eventId is not available
  }

  if (!event) {
    return <div>Loading event details...</div>; // Loading state while event data is being fetched
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
