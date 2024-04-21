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
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import useAccount from "../../../store/useAccount";
import React from "react";
import { search } from "../../../utils/ao/user";

export default function NavBar() {
  const username = useAccount((state) => state.username);
  const image = useAccount((state) => state.img);
  const form = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      params: { value: string };
    };
    if (target.params.value) {
      search(target.params.value)
        .then()
        .catch((err) => console.log(err));
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
    </Navbar>
  );
}
