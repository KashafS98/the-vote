import React from "react";
import Heading from "../components/Heading";
import IconCircle from "./IconCircle";
import { FaClock, FaTablet, FaUsers } from "react-icons/fa";

export default function Layout({ children, styles }) {
  return (
    <div className="m-0 h-screen w-screen">
      <div className="h-full w-full text-center flex flex-col items-center justify-between lg:text-left lg:flex-row">
        <div className="w-full lg:w-1/3 p-10 mx-auto flex flex-col justify-center">
          <Heading size="h1">The Vote</Heading>
          <Heading size="h3">The Vote has an awesome tagline here!</Heading>
          <p>
            Answer many questions with your most creative, irreverent, and witty
            responses to win votes from others. It's quick and fun with
            hilarious results that your group will be laughing about for days.
          </p>
          <div className="flex justify-between lg:w-2/3 w-full my-4">
            <IconCircle icon={<FaUsers />} title="Players" text="3-12" />
            <IconCircle icon={<FaClock />} title="Est. time" text="20 mins" />
            <IconCircle icon={<FaTablet />} title="Device" text="Multiple" />
          </div>
        </div>
        <div
          className={`lg:h-full lg:shadow-lg lg:w-1/2 lg:p-16 ${styles} relative`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
