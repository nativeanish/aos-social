import { useEffect, useState } from "react";
import { get_user_by_username } from "../../utils/ao/user";
import { Avatar } from "@nextui-org/react";

function Commen({ comment, username }: { comment: string; username: string }) {
  const [img, setImg] = useState("");
  useEffect(() => {
    get_user_by_username(username).then((data) => {
      if (data.image) {
        setImg(data.image);
      }
    });
  }, [username]);
  return (
    <>
      {img.length ? (
        <div>
          <div className="p-2 flex flex-row space-x-2 items-center relative">
            <div className="">
              <Avatar src={img} size="sm" />
            </div>
            <div className="flex flex-col space-y-0.5 items-left justify-start">
              <p className="text-sm text-slate-400">@{username}</p>
              <p className="text-base text-white">{comment}</p>
            </div>
          </div>

          <div className="border-t border-slate-600"></div>
        </div>
      ) : null}
    </>
  );
}

export default Commen;
