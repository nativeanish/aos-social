import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  useDisclosure,
  Spinner,
  Badge,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import useAccount from "../../../store/useAccount";
import React, { useEffect, useState } from "react";
import { search } from "../../../utils/ao/user";
import ModalLC from "../../Template/ModalLC";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { RiUserFollowFill } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { _clear } from "../../../utils/ao/post";

export default function NavBar() {
  const username = useAccount((state) => state.username);
  const image = useAccount((state) => state.img);
  const notification = useAccount((state) => state.notifications);
  const [param, setParam] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const data = useDisclosure();
  const form = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      params: { value: string };
    };
    if (target.params.value) {
      setParam(target.params.value);
      onOpen();
    }
  };
  const navigate = useNavigate();
  const navi = (e: string) => {
    if (e === "home") {
      navigate("/");
    }
    if (e === "profile") {
      navigate(`/@/${username}`);
    }
    if (e === "setting") {
      navigate("/setting");
    }
    if (e === "logout") {
      window.arweaveWallet.disconnect().then(() => {
        navigate("/");
      });
    }
  };
  const clear = () => {
    _clear()
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <Navbar
      isBordered
      className="bg-[#06141D] text-white border-b-1 border-white"
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="flex">
            <p className=" p-2 bg-black border-white border-1">AO</p>
            <p className="bg-white text-black p-2">social</p>
          </div>
        </NavbarBrand>
        <NavbarContent className=""></NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <form onSubmit={form}>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            name="params"
          />
        </form>
        <div
          className="flex items-center"
          onClick={() => {
            data.onOpen();
            clear();
          }}
        >
          <div className="cursor-pointer">
            <Badge
              content={notification.filter((e) => e.seen === false).length}
              color="danger"
            >
              <IoMdNotifications size={35} />
            </Badge>
          </div>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={image || "/avatars/avatar-1.png"}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onSelectionChange={(e) => navi([...e][0] as string)}
            selectedKeys={[]}
            selectionMode="single"
          >
            <DropdownItem key="profiles" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">@{username}</p>
            </DropdownItem>
            <DropdownItem key="home" color="primary">
              Home
            </DropdownItem>
            <DropdownItem key="profile" color="primary">
              My Profile
            </DropdownItem>
            <DropdownItem key="setting" color="primary">
              My Settings
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {param.length ? (
        <ModalLC
          onClose={onClose}
          onOpenChange={onOpenChange}
          title="Search"
          isOpen={isOpen}
          Body={<Body onClose={onClose} param={param} />}
        />
      ) : null}
      <ModalLC
        onClose={data.onClose}
        onOpenChange={data.onOpenChange}
        title="Notification"
        isOpen={data.isOpen}
        Body={<ShowNotification notification={notification} />}
      />
    </Navbar>
  );
}
function Body({ onClose, param }: { onClose: () => void; param: string }) {
  const [searching, setSearching] = useState(false);

  const [data, setData] = useState<
    Array<{ username: string; image: string; name: string }>
  >([]);
  const [nf, setNF] = useState(false);
  useEffect(() => {
    setSearching(true);
    search(param)
      .then((data) => {
        if (data) {
          console.log(data);
          setSearching(false);
          setData(data);
        } else {
          setSearching(false);
          console.log("not found");
          setNF(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSearching(false);
      });
  }, [param]);
  return (
    <>
      <div>
        {searching ? (
          <>
            <div className="flex flex-col items-center space-x-4">
              <div>
                <Spinner size="lg" color="secondary" />
              </div>
              <div>
                <p className="text-white text-md">Searching</p>
              </div>
            </div>
          </>
        ) : null}
        {nf ? (
          <>
            <div className="flex flex-col items-center space-x-4">
              <div>
                <p className="text-white text-md">No result found</p>
              </div>
            </div>
          </>
        ) : null}
        {data.length ? (
          <>
            <div className="border-t border-slate-600"></div>
            {data.map((e, i) => (
              <User
                key={i}
                username={param}
                image={e.image}
                name={e.name}
                onClose={onClose}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

function User({
  username,
  image,
  name,
  onClose,
}: {
  username: string;
  image: string;
  name: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="p-2 flex flex-row space-x-6 items-center relative cursor-pointer"
        onClick={() => {
          onClose();
          navigate(`/@/${username}`);
        }}
      >
        <div className="">
          <Avatar src={image} size="lg" />
        </div>
        <div className="flex flex-col space-y-0.5 items-left justify-start">
          <p className="text-sm text-slate-400">@{username}</p>
          <p className="text-md text-white">{name}</p>
        </div>
      </div>
      <div className="border-t border-slate-600"></div>
    </>
  );
}

function ShowNotification({
  notification,
}: {
  notification: Array<{
    data: "follow" | "comment" | "like";
    username: string;
    seen: boolean;
  }>;
}) {
  return (
    <div className="flex flex-col items-centers space-y-3">
      {notification.map((e, i) => (
        <Sh key={i} data={e.data} username={e.username} seen={e.seen} />
      ))}
    </div>
  );
}

function Sh({
  username,
  data,
}: {
  username: string;
  data: "follow" | "comment" | "like";
  seen: boolean;
}) {
  const naviagate = useNavigate();
  return (
    <>
      {data === "follow" ? (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-start space-x-2 text-md">
            <p>
              <RiUserFollowFill />
            </p>
            <div className="flex flex-row space-x-2">
              <p
                className="text-blue-400 cursor-pointer"
                onClick={() => naviagate(`/@/${username}`)}
              >
                @{username}
              </p>
              <p>followed you</p>
            </div>
          </div>
          <div className="border borde-1 borde-white"></div>
        </div>
      ) : null}
      {data === "comment" ? (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-start space-x-2 text-md">
            <p>
              <FaComment />
            </p>
            <div className="flex flex-row space-x-2">
              <p
                className="text-blue-400 cursor-pointer"
                onClick={() => naviagate(`/@/${username}`)}
              >
                @{username}
              </p>
              <p>commented on your post</p>
            </div>
          </div>
          <div className="border borde-1 borde-white"></div>
        </div>
      ) : null}
      {data === "like" ? (
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-start space-x-2 text-md">
            <p>
              <FcLike />
            </p>
            <div className="flex flex-row space-x-2">
              <p
                className="text-blue-400 cursor-pointer"
                onClick={() => naviagate(`/@/${username}`)}
              >
                @{username}
              </p>
              <p>liked your post</p>
            </div>
          </div>
          <div className="border borde-1 borde-white"></div>
        </div>
      ) : null}
    </>
  );
}
