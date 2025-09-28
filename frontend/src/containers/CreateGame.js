import Card from "../components/Card";
import Heading from "../components/Heading";
import { content } from "../content";

const WORK = "work";
const NSFW = "nsfw";

export default function CreateGame({ handleNext }) {
  return (
    <div className="my-8 w-full text-center flex flex-col items-center justify-center">
      <Heading size="h4">Start a new {content.game}</Heading>
      <div className="flex w-full xl:w-2/3 justify-evenly">
        <Card title={"Work"} onClick={() => handleNext(WORK)} />
        <Card title={"NSFW"} onClick={() => handleNext(NSFW)} />
      </div>
    </div>
  );
}
