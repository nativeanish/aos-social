import { create } from "zustand";

export type Pos = {
  comment: Array<{}>;
  data: string;
  id: string;
  like: Array<{}>;
  owner: string;
  time: string;
  username: string;
};
interface State {
  posts: null | Array<Pos>;
  setPosts: (e: null | Array<Pos>) => void;
}

const usePostStore = create<State>((set) => ({
  posts: null,
  setPosts: (e: null | Array<Pos>) => set({ posts: e }),
}));

export default usePostStore;
