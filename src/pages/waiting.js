import React from "react";
import Layout from "../containers/Layout";
import WaitingRoom from "../containers/WaitingRoom";
import { useLocation } from "react-router-dom";

export default function Waiting() {
  const props = useLocation();

  return (
    <Layout styles={"flex flex-col justify-center items-center"}>
      <WaitingRoom pregameSetup={props.state} />
    </Layout>
  );
}
