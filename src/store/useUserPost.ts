import { create } from "zustand";

export type Pos = {
  comment: Array<{ username: string; data: string }>;
  data: string;
  id: string;
  like: Array<string>;
  owner: string;
  time: string;
  username: string;
};
interface State {
  posts: null | Array<Pos>;
  setPosts: (e: null | Array<Pos>) => void;
}

const useUserPost = create<State>((set) => ({
  posts: null,
  setPosts: (e: null | Array<Pos>) => set({ posts: e }),
}));

export default useUserPost;
