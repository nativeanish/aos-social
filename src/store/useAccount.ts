import { create } from "zustand";

interface State {
  account: null | boolean;
  set_Account: (e: boolean) => void;
  name: null | string;
  set_name: (e: string) => void;
  username: null | string;
  set_username: (e: string) => void;
  img: null | string;
  set_img: (e: string) => void;
}

const useAccount = create<State>((set) => ({
  account: null,
  set_Account(e) {
    set({ account: e });
  },
  name: null,
  set_name(e) {
    set({ name: e });
  },
  username: null,
  set_username(e) {
    set({ username: e });
  },
  img: null,
  set_img(e) {
    set({ img: e });
  },
}));
export default useAccount;
