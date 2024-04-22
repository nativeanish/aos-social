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
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { comment_async, like_async } from "../../utils/ao/post";
import useAddress from "../../store/useAddress";
import { FcLike } from "react-icons/fc";
import ModalLC from "../Template/ModalLC";
import Commen from "../Template/Commen";
function Editor({
  isReadOnly,
  data,
  like,
  comment,
  id,
  isComment = false,
}: {
  isReadOnly: boolean;
  data?: string;
  like?: Array<string>;
  comment?: Array<{ username: string; data: string }>;
  id: string;
  isComment?: boolean;
}) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const intitailConfig: InitialConfigType = {
    editorState: isReadOnly && data?.toString ? data : null,
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
    editable: isReadOnly && data?.length ? false : true,
  };
  const address = useAddress((state) => state.address);
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
                  {/* <ContentEditable className="p-2 m-2 h-auto border-1 rounded-xl" /> */}
                  <ContentEditable
                    className={
                      isReadOnly && data?.length
                        ? "p-2 m-2 h-auto  rounded-xl"
                        : "p-2 m-2 h-auto border-1 rounded-xl"
                    }
                  />
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
          {isComment ? null : (
            <>
              {!isReadOnly && !data?.length ? (
                <div className="flex flex-row space-x-1 ml-2">
                  <Toolbar setIsLinkEditMode={setIsLinkEditMode} />
                  <SaveButton />
                </div>
              ) : (
                <>
                  <div className="border-t border-slate-600 py-1"></div>
                  <div className="flex flex-row items-start text-white text-2xl space-x-4">
                    <div className="flex flex-row space-x-2 items-center">
                      {like ? <p className="text-xl">{like.length}</p> : null}
                      {like && like.filter((e) => e === address).length ? (
                        <FcLike className="cursor-not-allowed" />
                      ) : (
                        <FaRegHeart
                          className="cursor-pointer"
                          onClick={() =>
                            like_async(id)
                              .then()
                              .catch((err) => console.log(err))
                          }
                        />
                      )}
                    </div>
                    <div className="flex flex-row  space-x-2 items-center">
                      {comment ? (
                        <p className="text-xl">{comment.length}</p>
                      ) : null}
                      <FaRegComment
                        className="cursor-pointer"
                        onClick={onOpen}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {data?.length ? (
          <ModalLC
            onClose={onClose}
            title="Comment"
            Body={
              <Body onClose={onClose} id={id} data={data} comment={comment} />
            }
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        ) : null}
      </LexicalComposer>
    </>
  );
}

export default Editor;

const Body = ({
  id,
  data,
  comment,
}: {
  onClose: () => void;
  id: string;
  data: string;
  comment: Array<{ username: string; data: string }> | undefined;
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const save = () => {
    if (text.length) {
      setLoading(true);
      comment_async(id, text)
        .then(() => {
          setLoading(false);
          setText("");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div>
        <Editor isReadOnly={true} data={data} id={id} isComment={true} />
      </div>
      <div className="border-t border-slate-600 py-1"></div>
      <div>
        <Input
          label="Comment"
          type="text"
          placeholder="Add your Comment"
          variant="bordered"
          endContent={
            <Button size="sm" isDisabled={loading} onClick={() => save()}>
              save
            </Button>
          }
          value={text}
          onValueChange={setText}
          isDisabled={loading}
        />
      </div>
      <div className="border-t border-slate-600 mt-2"></div>
      <div>
        {comment?.length
          ? comment.map((e, i) => (
              <Commen comment={e.data} username={e.username} key={i} />
            ))
          : null}
      </div>
    </div>
  );
};
