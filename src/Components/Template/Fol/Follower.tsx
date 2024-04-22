import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { get_user_for_fol } from "../../../utils/ao/user";
import { useNavigate } from "react-router-dom";

function Follower({ follower }: { follower: Array<string> }) {
  return (
    <>
      <div
        className="mt-5 
      p-2 rounded-lg flex flex-col space-y-3"
      >
        {follower.map((e, i) => (
          <SHow key={i} follower={e} />
        ))}
      </div>
    </>
  );
}
export default Follower;
function SHow({ follower }: { follower: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState<null | string>(null);
  const [img, setImg] = useState<null | string>(null);
  useEffect(() => {
    get_user_for_fol(follower).then((data) => {
      if (data) {
        if (data.image && data.name) {
          setImg(data.image);
          setName(data.name);
        }
      }
    });
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
