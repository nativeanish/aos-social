import { Avatar } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { get_user_for_fol } from "../../../utils/ao/user";
import { useNavigate } from "react-router-dom";

function Following({ following }: { following: Array<string> }) {
  return (
    <>
      <div
        className="mt-5 
      p-2 rounded-lg flex flex-col space-y-3"
      >
        {following.map((e, i) => (
          <SHow key={i} follower={e} />
        ))}
      </div>
    </>
  );
}
export default Following;
function SHow({ follower }: { follower: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState<null | string>(null);
  const [img, setImg] = useState<null | string>(null);
  const useCall = useCallback(() => {
    get_user_for_fol(follower).then((data) => {
      if (data) {
        if (data.image && data.name) {
          setImg(data.image);
          setName(data.name);
        }
      }
    });
  }, [follower]);
  useEffect(() => {
    useCall();
  }, [follower]);
  return (
    <div>
      {name && img ? (
        <div className="flex flex-row items-center gap-4 bg-[#06141D] p-2 rounded-lg">
          <Avatar src={img} size="md" radius="full" />
          <div>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate(`/@/${follower}`)}
            >
              @{follower}
            </p>
            <p>{name}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
