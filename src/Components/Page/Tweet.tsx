// import Editor from "../Editor";

import { Avatar } from "@nextui-org/react";
import Editor from "../Editor";
import { Pos } from "../../store/usePostStore";
import { useEffect, useState } from "react";
import { get_user_by_username } from "../../utils/ao/user";
interface Props {
  props: Pos;
}
function Tweet({ props }: Props) {
  const [data, setData] = useState<{
    username: string;
    image: string;
    name: string;
    like: [];
    comment: [];
  } | null>(null);
  useEffect(() => {
    if (props.username) {
      get_user_by_username(props.username).then((_data) => {
        if (_data) {
          setData(_data);
        }
      });
    }
  }, [props.username]);
  return (
    <>
      {!data ? null : (
        <div className="bg-[#1B2730] p-4 rounded-xl">
          <div className="flex flex-row space-x-2">
            <div className="flex-none">
              <Avatar src={data?.image} size="md" radius="sm" />
            </div>
            <div className="flex flex-col space-y-2 items-left justify-start w-full">
              <div>
                <div className="mt-2 flex flex-row space-x-1">
                  <p className="text-base text-white">{data?.name}</p>
                  <p className="text-base text-slate-400">@{props.username}</p>
                </div>
                <p className="text-sm text-slate-300">
                  {convertTimestamp(props.time)}
                </p>
              </div>
              <div className="flex">
                <Editor
                  isReadOnly={true}
                  data={props.data}
                  like={props.like}
                  comment={props.comment}
                  id={props.id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Tweet;

function convertTimestamp(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString();
}
