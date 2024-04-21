// import Editor from "../Editor";

import { Avatar } from "@nextui-org/react";
import Editor from "../Editor";
import useAccount from "../../store/useAccount";

function Post() {
  const img = useAccount((state) => state.img);
  const name = useAccount((state) => state.name);
  const username = useAccount((state) => state.username);
  return (
    <>
      <div className="bg-[#1B2730] p-4 rounded-xl">
        <div className="flex flex-row space-x-2">
          <div className="flex-none">
            <Avatar src={img?.length ? img : ""} size="md" radius="sm" />
          </div>
          <div className="flex flex-col space-y-2 items-left justify-start w-full">
            <div className="mt-2 flex flex-row space-x-1">
              <p className="text-base text-white">{name}</p>
              <p className="text-base text-slate-400">@{username}</p>
            </div>
            <div className="flex">
              <Editor isReadOnly={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
