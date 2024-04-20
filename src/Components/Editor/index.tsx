// import Toolbar from "../../Components/Toolbar";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import theme from "../../theme/theme";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import CodeHighlightPlugin from "./Plugin/Code/CodeHighlightPlugin";
import CodeActionMenuPlugin from "./Plugin/CodeActionMenuPlugin";
import { ParagraphNode } from "lexical";
import ListMaxIndentLevelPlugin from "./Plugin/ListMaxIndentLevelPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import LinkPlugin from "./Plugin/LinkPlugin";
import FloatingLinkEditorPlugin from "./Plugin/FloatingLinkEditorPlugin";
import LexicalAutoLinkPlugin from "./Plugin/AutoLinkPlugin";
import { CAN_USE_DOM } from "../../utils/editor/DOM";
import { useEffect, useState } from "react";
import { EmojiNode } from "./Plugin/Emoji/EmojiNode";
import EmojisPlugin from "./Plugin/Emoji/EmojiPlugin";
import EmojiPickerPlugin from "./Plugin/Emoji/EmojiPickerPlugin";
import Toolbar from "./Toolbar";
import ImagePlugin from "./Plugin/Image/ImagePlugin";
import { ImageNode } from "./Plugin/Image/ImageNode";
import { YoutubeNode } from "./Plugin/Youtube/YoutubeNode";
import YoutubePlugin from "./Plugin/Youtube/YoutubePlugin";
import { TweetNode } from "./Plugin/Twitter/TwitterNode";
import TwitterPlugin from "./Plugin/Twitter/TwitterPlugin";
import SaveButton from "./Toolbar/SaveButton";

function Editor({ isReadOnly }: { isReadOnly: boolean }) {
  const intitailConfig: InitialConfigType = {
    editorState: null,
    onError: (error) => {
      console.log(error);
    },
    namespace: "editor",
    theme: theme,
    nodes: [
      HeadingNode,
      ListItemNode,
      ListNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      ParagraphNode,
      LinkNode,
      AutoLinkNode,
      EmojiNode,
      ImageNode,
      YoutubeNode,
      TweetNode,
    ],
  };

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);
  return (
    <>
      <LexicalComposer initialConfig={intitailConfig}>
        <div className="w-[90%] flex flex-col space-y-1">
          <div className="container relative">
            <RichTextPlugin
              contentEditable={
                <div ref={onRef}>
                  <ContentEditable className="p-2 m-2 h-auto border-1 rounded-xl" />
                </div>
              }
              placeholder={
                <div className="absolute top-4 left-5 text-slate-600">
                  Enter Text Here!
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <CodeHighlightPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <LinkPlugin />
            <LexicalAutoLinkPlugin />
            <EmojisPlugin />
            <EmojiPickerPlugin />
            <ImagePlugin />
            <YoutubePlugin />
            <TwitterPlugin />
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />

                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
              </>
            )}
          </div>
          {!isReadOnly ? (
            <div className="flex flex-row space-x-1 ml-2">
              <Toolbar setIsLinkEditMode={setIsLinkEditMode} />
              <SaveButton />
            </div>
          ) : null}
        </div>
      </LexicalComposer>
    </>
  );
}

export default Editor;
