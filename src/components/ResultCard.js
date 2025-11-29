import classNames from "classnames";
import { FaAward, FaPeopleGroup } from "react-icons/fa6";

export default function ResultCard({ data, result, key, winner }) {
  console.log("ResultCard data:", data, result, winner);
  return (
    <div className="rounded-lg w-1/3 flex" key={key}>
      <div
        className={classNames(
          "border p-4 m-4 rounded-lg",
          winner ? "bg-purple text-white" : ""
        )}
      >
        <div>
          <div className="flex items-center gap-4 ">
            {/* <span className="text-3xl">{data.avatar}</span> */}
            <div className="font-black text-2xl flex flex-row flex-between items-center">
              {winner && <FaAward className="text-yellow mr-3" />}
              {data.name}
            </div>
          </div>
        </div>
        {data.questions.map((q, index) => (
          <div
            key={index}
            className={classNames(
              "mt-2 p-2",
              winner ? "bg-blue/30 text-white" : " bg-purple/10"
            )}
          >
            <p className="font-semibold w-5/6">{q.question}</p>
            <div className="flex items-center gap-2">
              <p className="px-2 py-1 bg-blue h-fit w-fit leading-none rounded-full text-white">
                {q.count} votes
              </p>
              <FaPeopleGroup /> {q.voters.map((v) => v.name).join(", ")}
            </div>
            {/* <p>Voters: </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}
