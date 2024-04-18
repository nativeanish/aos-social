import { create } from "zustand";

export const element = [
  "paragraph",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "number",
  "bullet",
  "check",
  "quote",
  "codeblock",
];
interface State {
  element: (typeof element)[0];
  set_element: (e: (typeof element)[0]) => void;
}
const useElement = create<State>((set) => ({
  element: "paragraph",
  set_element: (e: (typeof element)[0]) => set({ element: e }),
}));
export default useElement;
