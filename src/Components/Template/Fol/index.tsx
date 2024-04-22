import { Button } from "@nextui-org/react";
import Follower from "./Follower";
import { useState } from "react";
import Following from "./Following";

interface Props {
  follower: Array<string>;
  following: Array<string>;
}
function Fol({ follower, following }: Props) {
  const [select, seSelect] = useState<"follower" | "following">("follower");
  return (
    <div>
      <div className="bg-[#1B2730] w-64 text-white p-2 rounded-lg">
        <div className="flex flex-row space-x-2 justify-evenly mt-2">
          <Button
            radius="sm"
            className={
              select === "follower"
                ? "bg-[#06141D] text-white hover:bg-white hover:text-black"
                : "hover:bg-[#06141D] hover:text-white"
            }
            onClick={() => seSelect("follower")}
          >
            Follower
          </Button>
          <Button
            radius="sm"
            className={
              select === "following"
                ? "bg-[#06141D] text-white hover:bg-white hover:text-black"
                : "hover:bg-[#06141D] hover:text-white"
            }
            onClick={() => seSelect("following")}
          >
            Following
          </Button>
        </div>
        {select === "following" ? <Following following={following} /> : null}
        {select === "follower" ? <Follower follower={follower} /> : null}
      </div>
    </div>
  );
}

export default Fol;
