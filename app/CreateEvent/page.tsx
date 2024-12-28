"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import BasicDetails from "../CreateEvent/components/BasicDetails/page";
import Registration from "../CreateEvent/components/Registration/page";
import Customization from "../CreateEvent/components/Customization/page";

type Props = {};

const Page = (props: Props) => {
  // State for managing steps
  const [currentStep, setCurrentStep] = useState<"basicDetails" | "registration" | "customization">("basicDetails");

  // States for event details
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState<number | null>(null);
  const [maximumTickets, setMaximumTickets] = useState<number | null>(null);
 
  const [location, setLocation] = useState("");
  // Navigation handlers
  const Handlenext = () => {
    if (currentStep === "basicDetails") {
      setCurrentStep("registration");
    } else if (currentStep === "registration") {
      setCurrentStep("customization");
    }
  };

  const Handleback = () => {
    if (currentStep === "registration") {
      setCurrentStep("basicDetails");
    } else if (currentStep === "customization") {
      setCurrentStep("registration");
    }
  };

  // Dynamic component rendering
  const Rendercomponent = () => {
    switch (currentStep) {
      case "basicDetails":
        return (
          <BasicDetails
            eventName={eventName}
            setEventName={setEventName}
            eventDescription={eventDescription}
            setEventDescription={setEventDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            setLocation={setLocation}
            location={location}
            ticketPrice={ticketPrice}
            setTicketPrice={setTicketPrice}
            maximumTickets={maximumTickets}
            setMaximumTickets={setMaximumTickets}
            onBack={Handleback}
            onNext={Handlenext}
          />
        );
      case "registration":
        return (
          <Registration
          eventName={eventName}
          setEventName={setEventName}
          eventDescription={eventDescription}
          setEventDescription={setEventDescription}
          startDate={startDate}
          setStartDate={setStartDate}
          startTime={startTime}
          setStartTime={setStartTime}
         
          ticketPrice={ticketPrice}
          setTicketPrice={setTicketPrice}
          maximumTickets={maximumTickets}
          setMaximumTickets={setMaximumTickets}
          onBack={Handleback}
          onNext={Handlenext}
          />
        );
      case "customization":
        return <Customization 
            eventName={eventName}
            setEventName={setEventName}
            eventDescription={eventDescription}
            setEventDescription={setEventDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            setLocation={setLocation}
            location={location}
            ticketPrice={ticketPrice}
            setTicketPrice={setTicketPrice}
            maximumTickets={maximumTickets}
            setMaximumTickets={setMaximumTickets}
            onBack={Handleback}
            onNext={Handlenext}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="text-black BookHead">
      <div className="bg-[url('/BgImg3.webp')] bg-cover bg-center min-h-screen">
        <div className="py-3 md:py-6">
          <div className="text-customEnd">
            <Header />
          </div>
          <div className="max-w-6xl mx-auto pt-16 space-y-3">
            <p className="text-4xl text-center">Create new event</p>
            <div className="mx-auto">{Rendercomponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
