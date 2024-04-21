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
  description: null | string;
  set_description: (e: string) => void;
  follower: Array<{}>;
  set_follower: (e: Array<{}>) => void;
  following: Array<{}>;
  set_following: (e: Array<{}>) => void;
  notifications: Array<{}>;
  set_notifications: (e: Array<{}>) => void;
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
  description: null,
  set_description(e) {
    set({ description: e });
  },
  follower: [],
  set_follower(e) {
    set({ follower: e });
  },
  following: [],
  set_following(e) {
    set({ following: e });
  },
  notifications: [],
  set_notifications(e) {
    set({ notifications: e });
  },
}));
export default useAccount;
