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
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import useAccount from "../../../store/useAccount";
import React, { useEffect, useState } from "react";
import { search } from "../../../utils/ao/user";
import ModalLC from "../../Template/ModalLC";

export default function NavBar() {
  const username = useAccount((state) => state.username);
  const image = useAccount((state) => state.img);
  const [param, setParam] = useState("");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
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
  return (
    <Navbar
      isBordered
      className="bg-[#06141D] text-white border-b-1 border-white"
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          {/* <AcmeLogo /> */}
          {/* <p className="hidden sm:block font-bold text-inherit">ACME</p> */}
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
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">@{username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="profiles">My Profile</DropdownItem>
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
              <User key={i} {...e} />
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
}: {
  username: string;
  image: string;
  name: string;
}) {
  return (
    <>
      <div className="p-2 flex flex-row space-x-6 items-center relative">
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
