import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  useDisclosure,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { convertSVGToBase64 } from "../../utils/svg";
import Modals from "../Template/Modals";
import { useState } from "react";
import { update_description } from "../../utils/ao/post";
import useAccount from "../../store/useAccount";
import { MdDone, MdExposurePlus1 } from "react-icons/md";
import { _follow, get_user_by_username } from "../../utils/ao/user";
import { useNavigate } from "react-router-dom";
function UserCard({
  image,
  name,
  username,
  description,
  following,
  follower,
  viewOnly = false,
}: {
  image: string;
  name: string;
  username: string;
  description: string | null;
  following: Array<string>;
  follower: Array<string>;
  viewOnly?: boolean;
}) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isFollowing, setFollowing] = useState(false);
  const follow = () => {
    console.log("Started Following");
    setFollowing(true);
    _follow(username)
      .then((data) => {
        if (data) {
          setFollowing(false);
          get_user_by_username(username)
            .then()
            .catch((err) => console.log(err));
        } else {
          setFollowing(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setFollowing(false);
      });
  };
  const _username = useAccount((state) => state.username);
  return (
    <div className="hidden lg:relative lg:block lg:flex-none ml-5">
      <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>
      <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
      <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
      <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
        <Card className="max-w-[400px] bg-[#1B2730]">
          <CardHeader className="justify-between ">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={convertSVGToBase64(image)}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-white">
                  {name}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @{username}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 mt-6">
            {description && description.length ? (
              <>
                <p>{description}</p>
              </>
            ) : (
              <>
                {!viewOnly ? (
                  <div className="flex justify-center">
                    <Button onClick={onOpen}>Add Description</Button>
                  </div>
                ) : null}
              </>
            )}
          </CardBody>
          <CardFooter className="flex flex-row items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                {follower.length}
              </p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                {following.length}
              </p>
              <p className="text-default-400 text-small">Follower</p>
            </div>
          </CardFooter>
          <CardFooter className="flex flex-row items-center justify-center">
            <div className="flex items-center justify-center">
              {username === _username ? null : (
                <>
                  {follower.filter((e) => e === _username).length ? (
                    <Button startContent={<MdDone />} disabled>
                      Following
                    </Button>
                  ) : (
                    <>
                      {isFollowing ? (
                        <>
                          <Button startContent={<Spinner size="sm" />}>
                            Following
                          </Button>
                        </>
                      ) : (
                        <Button
                          startContent={<MdExposurePlus1 />}
                          onClick={() => follow()}
                        >
                          Follow
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
      <Modals
        title="Add Description"
        isOpen={isOpen}
        onClose={onClose}
        Body={<Body onClose={onClose} />}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default UserCard;
function Body({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const update = () => {
    update_description(text)
      .then((data) => {
        if (data) {
          onClose();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        onClose();
      });
  };
  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <Textarea
            variant="faded"
            label="Description"
            placeholder="Enter your description"
            description="Enter a concise description of your."
            className="w-full"
            value={text}
            onValueChange={setText}
          />
        </div>
        <Button
          color="primary"
          onPress={update}
          className="p-1 ml-1"
          isDisabled={!text.length}
        >
          Add
        </Button>
      </div>
    </>
  );
}
