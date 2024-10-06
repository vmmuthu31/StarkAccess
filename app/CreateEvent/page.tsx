import React from "react";
import Header from "../components/Header";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="text-black BookHead">
      <div className="bg-[url('/BgImg3.webp')] bg-cover bg-center min-h-screen">
        <div className="py-3 md:py-6">
          <div className="text-customEnd">
            <Header />
          </div>
          <div className="max-w-6xl mx-auto pt-16 space-y-3">
            <p className=" text-4xl text-center">Create new event</p>
            <div className="flex space-x-10">
              <div className=" space-y-4 w-[212px]">
                <p className=" text-[#4390F2] text-lg border-t-[3px] border-[#4390F2] pt-2 w-full">
                  Basic Event Details
                </p>
                <p className=" text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
                  Ticketing & Registration
                </p>
                <p className=" text-[#98A0A8] text-lg border-t-[3px] border-[#98A0A8] pt-2 w-full">
                  Customization & Media
                </p>
              </div>
              <div className="flex space-x-10">
                <div className=" w-[430px] h-[278px] space-y-3">
                  <div className="space-y-1">
                    <p className=" text-lg">Event Name</p>
                    <input
                      type="text"
                      placeholder="Enter the name of the event (max 100 characters)."
                      className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className=" text-lg">Event Description</p>
                    <textarea
                      placeholder="Enter the name of the event (max 100 characters)."
                      className="w-full h-[150px] text-start p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                    />
                  </div>
                </div>

                {/* right */}
                <div className="w-[430px] h-[278px] space-y-6">
                  <div className="space-y-1">
                    <p className=" text-lg">Location/Virtual Platform</p>
                    <div className="">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="option"
                          value="option1"
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-2">If in-person</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input
                          type="radio"
                          name="option"
                          value="option2"
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-2">If virtual</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Add location"
                      className="w-full h-[53px] p-2 px-4 rounded-[10px] bg-[#DAE7FC] border border-[#4390F2]/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className=" text-lg">Event data & time</p>
                    <div className="bg-[#DAE7FC] w-full h-[109px] p-2 px-4 rounded-[10px] border border-[#4390F2]/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
