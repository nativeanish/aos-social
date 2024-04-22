import { ChangeEvent, useEffect, useState } from "react";
import { checkConnection } from "../utils/arconnect";
import useAccount from "../store/useAccount";
import useAddress from "../store/useAddress";
import { useNavigate } from "react-router-dom";
import { check_user_exits } from "../utils/ao/user";
import NavBar from "../Components/Page/NavBar.tsx";
import { Input, Image, Button, Textarea } from "@nextui-org/react";
import { AiTwotoneCamera } from "react-icons/ai";
import {
  update_description,
  update_image,
  update_name,
} from "../utils/ao/post.ts";

function Settings() {
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const name = useAccount((state) => state.name);
  const img = useAccount((state) => state.img);
  const description = useAccount((state) => state.description);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", async () => {
      checkConnection()
        .then((data) => {
          console.log(data);
          if (!data) {
            if (!account) {
              navigate("/");
            }
          }
        })
        .catch((err) => console.log(err));
    });
    if (address?.length) {
      check_user_exits()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    if (address?.length && account === false) {
      navigate("/onboard");
    }
    if (address?.length && account === true) {
    }
    if (!address) {
      navigate("/");
    }
  }, [address, account]);
  const [image, setImage] = useState(img);
  const [text, setText] = useState(name);
  const [des, setDes] = useState(description);
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const mar = e.target.files[0].type;
      if (
        mar === "image/png" ||
        mar === "image/svg+xml" ||
        mar === "image/jpeg"
      ) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImage(reader.result as string);
        });
        reader.readAsDataURL(e.target.files[0]);
      } else {
        console.log("YOu have not uploaded image");
      }
    }
  };
  const descrip = () => {
    if (des?.length) {
      update_description(des)
        .then((data) => {
          if (data) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const tex = () => {
    if (text?.length) {
      update_name(text)
        .then((data) => {
          if (data) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const im = () => {
    if (image?.length) {
      update_image(image)
        .then((data) => {
          if (data) {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <NavBar />
      {name && img && description ? (
        <div className="relative min-h-screen min-w-screen">
          <div className="flex flex-row w-full space-x-5 items-center mt-12">
            <div className="w-full">
              <Input
                type="text"
                label="Name"
                value={text?.length ? text : ""}
                className="max-w-xs"
                onChange={(e) => setText(e.currentTarget.value)}
              />
              <Button
                color="primary"
                className="w-full mt-2"
                isDisabled={name === text || !text?.length}
                onClick={() => tex()}
              >
                Update Name
              </Button>
              <Textarea
                label="Description"
                className="mt-4"
                value={des?.length ? des : ""}
                onChange={(e) => setDes(e.currentTarget.value)}
              />
              <Button
                color="primary"
                className="w-full mt-2"
                isDisabled={des === description || !des?.length}
                onClick={() => descrip()}
              >
                Update Description
              </Button>
            </div>
            <div className="p-2 border border-white bg-white mt-4 w-full">
              <Image
                alt="profile"
                height={200}
                radius="sm"
                src={image?.length ? image : img}
                width={200}
                style={{ height: 200, width: 200 }}
              />
              <Button
                color="success"
                endContent={<AiTwotoneCamera />}
                className="w-full mt-3"
              >
                Take a Photo
                <input
                  type="file"
                  className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                  accept="image*/"
                  onChange={upload}
                />
              </Button>
              <Button
                color="primary"
                className="w-full mt-2"
                isDisabled={image === img}
                onClick={() => im()}
              >
                Update Image
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Settings;
