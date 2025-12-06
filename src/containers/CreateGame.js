import Card from "../components/Card";
import Heading from "../components/Heading";
import { content } from "../content";

const WORK = "work";
const NSFW = "nsfw";

export default function CreateGame({ handleNext }) {
  return (
    <div className="lg:my-8 w-2/3 text-center flex flex-col items-center justify-center rounded-lg lg:p-8 mb-4">
      <Heading size="h4">Start a new {content.game}</Heading>
      <div className="flex w-full xl:w-2/3 justify-evenly">
        <Card avatar={"work"} title={"Work"} onClick={() => handleNext(WORK)} />
        <Card avatar={"nsfw"} title={"NSFW"} onClick={() => handleNext(NSFW)} />
      </div>
    </div>
  );
}
