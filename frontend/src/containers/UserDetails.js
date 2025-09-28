import { useState } from "react";

import Heading from "../components/Heading";
import Avatar from "../components/Avatar";

import { content } from "../content";
import MiniForm from "./MiniForm";

export default function UserDetails({ handleNext }) {
  const [selectedAvatar, setselectedAvatar] = useState("devil");
  const [username, setusername] = useState("kash");

  const handleAvatar = (key) => {
    setselectedAvatar(key);
  };

  const handleUser = (e) => {
    setusername(e.target.value);
  };

  const saveUserdetails = () => {
    handleNext(selectedAvatar, username);
  };

  return (
    <>
      <div className="mb-4 w-full text-center flex flex-col items-center justify-center">
        <Heading size="h4">Choose your avatar:</Heading>
        <div className="flex w-full xl:w-3/4 justify-evenly flex-wrap">
          {Object.entries(content.avatars).map(([key, val]) => {
            return (
              <Avatar
                emoji={val}
                alt={key}
                key={key}
                hover
                onClick={() => handleAvatar(key)}
                active={key === selectedAvatar}
                // color={`bg-${content.colors[ind]}`}
              />
            );
          })}
        </div>
      </div>
      <MiniForm
        title={`What do people call you?`}
        placeholder="Enter your name"
        value={username}
        handleChange={handleUser}
        handleSubmit={saveUserdetails}
      />
    </>
  );
}
