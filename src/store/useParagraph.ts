import { create } from "zustand";

interface State {
  bold: boolean;
  set_bold: (b: boolean) => void;
  itatlic: boolean;
  set_itatlic: (b: boolean) => void;
  underline: boolean;
  set_underline: (b: boolean) => void;
  superscript: boolean;
  set_superscript: (b: boolean) => void;
  subscript: boolean;
  set_subscript: (b: boolean) => void;
  strikethrough: boolean;
  set_strikethrough: (b: boolean) => void;
  code: boolean;
  set_code: (b: boolean) => void;
  highlight: boolean;
  set_highlight: (b: boolean) => void;
}
const useParagraph = create<State>((set) => ({
  bold: false,
  set_bold: (b) => set({ bold: b }),
  itatlic: false,
  set_itatlic: (b) => set({ itatlic: b }),
  underline: false,
  set_underline: (b) => set({ underline: b }),
  superscript: false,
  set_superscript: (b) => set({ superscript: b }),
  subscript: false,
  set_subscript: (b) => set({ subscript: b }),
  strikethrough: false,
  set_strikethrough: (b) => set({ strikethrough: b }),
  code: false,
  set_code: (b) => set({ code: b }),
  highlight: false,
  set_highlight: (b) => set({ highlight: b }),
}));
export default useParagraph;
