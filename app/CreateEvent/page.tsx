"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import BasicDetails from "../CreateEvent/components/BasicDetails/page";
import Registration from "../CreateEvent/components/Registration/page";
import Customization from "../CreateEvent/components/Customization/page"; 
// import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const [currentStep, setCurrentStep] = useState<"basicDetails" | "registration" | "customization">("basicDetails");

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

  const Rendercomponent = () => {
    switch (currentStep) {
      case "basicDetails":
        return <BasicDetails onNext={Handlenext} />;
      case "registration":
        return <Registration onNext={Handlenext} onBack={Handleback} />;
      case "customization":
        return <Customization onBack={Handleback} />;
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
        {/* <div className="absolute bottom-0 w-full">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Page;
