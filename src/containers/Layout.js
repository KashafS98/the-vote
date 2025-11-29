import Heading from "../components/Heading";
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdDevices } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";

export default function Layout({ children, styles }) {
  return (
    <div className="m-0 h-screen w-screen">
      <div className="h-full w-full text-center flex flex-col items-center justify-between lg:text-left md:flex-row">
        <div className="md:w-1/2 sm:w-full sm:p-20 p-10 mx-auto flex flex-col justify-center">
          <div className="mx-auto lg:mx-0 w-20 h-20 bg-purple/10 rounded-full flex items-center justify-center mb-4">
            <IoGameControllerOutline />
          </div>
          <Heading size="h1" color="text-purple" styles={"mb-4"}>
            The Vote
          </Heading>
          <Heading size="h3" styles={"mb-2"}>
            Swipe. Vote. Brag.
          </Heading>
          <div>
            <p>
              Answer many questions with your most creative, irreverent, and
              witty responses to win votes from others. It's quick and fun with
              hilarious results that your group will be laughing about for days.
            </p>
          </div>
          <div className="flex justify-between lg:w-2/3 w-full my-4">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mb-2">
                <FiUsers className="text-orange text-2xl" />
              </div>
              <span className="font-semibold text-sm">Players</span>
              <span className="text-gray-600 text-xs">3-12</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mb-2">
                <FaRegClock className="text-green text-2xl" />
              </div>
              <span className="font-semibold text-sm">Est. Time</span>
              <span className="text-gray-600 text-xs">20 mins</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue/10 rounded-full flex items-center justify-center mb-2">
                <MdDevices className="text-blue text-2xl" />
              </div>
              <span className="font-semibold text-sm">Device</span>
              <span className="text-gray-600 text-xs">Multiple</span>
            </div>
          </div>
        </div>
        <div
          className={`lg:h-full lg:shadow-lg md:w-1/2 lg:p-16 ${styles} relative`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
