import Element from "./Element";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  EditorState,
  KEY_MODIFIER_COMMAND,
} from "lexical";
import useElement from "../../../store/useElement";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text";
import { $isListNode } from "@lexical/list";
import { $isCodeNode, getDefaultCodeLanguage } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useParagraph from "../../../store/useParagraph";
import Paragraph from "./Paragraph";
import Code from "../Plugin/Code";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import FontColor from "./TextColor";
import BgColor from "./BgColor";
import { FontFamily } from "./FontFamily";
import { sanitizeUrl } from "../../../utils/url";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import Link from "./Link";
import { getSelectedNode } from "../../../utils/getSelectedNode";
import { $findMatchingParent } from "@lexical/utils";
import Image from "./Image";
import Youtube from "./Youtube";
import Twitter from "./Twitter";
function Toolbar({
  setIsLinkEditMode,
}: {
  setIsLinkEditMode: Dispatch<boolean>;
}) {
  const [editor] = useLexicalComposerContext();
  const [selectedElementKey, setSelectedElementKey] = useState<string>("");
  const set_element = useElement((state) => state.set_element);
  const element = useElement((state) => state.element);
  const [codeLanguage, setCodeLanguage] = useState("");
  const setBold = useParagraph((state) => state.set_bold);
  const setItalics = useParagraph((state) => state.set_itatlic);
  const setUnderline = useParagraph((state) => state.set_underline);
  const setSuperscript = useParagraph((state) => state.set_superscript);
  const setSubscript = useParagraph((state) => state.set_subscript);
  const setStrikethrough = useParagraph((state) => state.set_strikethrough);
  const setCode = useParagraph((state) => state.set_code);
  const setHighlight = useParagraph((state) => state.set_highlight);
  const [fontColor, setFontColor] = useState<string>("#ffffff");
  const [bgColor, setBgColor] = useState<string>("#1B2730");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isLink, setIsLink] = useState(false);
  const onchange = (e: EditorState) => {
    e.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);
        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
        }
        // Heading
        $isHeadingNode(element)
          ? set_element(element.getTag())
          : set_element(element.getType());

        // List
        if ($isListNode(element)) {
          set_element(element.getListType());
        }

        //Quote
        if ($isQuoteNode(element)) {
          set_element("quote");
        }

        //Code
        if ($isCodeNode(element)) {
          set_element("codeblock");
          setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
        }

        //Paragraph
        setBold(selection.hasFormat("bold"));
        setItalics(selection.hasFormat("italic"));
        setUnderline(selection.hasFormat("underline"));
        setSuperscript(selection.hasFormat("superscript"));
        setSubscript(selection.hasFormat("subscript"));
        setStrikethrough(selection.hasFormat("strikethrough"));
        setCode(selection.hasFormat("code"));
        setHighlight(selection.hasFormat("highlight"));

        //Color
        setFontColor(
          $getSelectionStyleValueForProperty(selection, "color", "#ffffff")
        );
        setBgColor(
          $getSelectionStyleValueForProperty(
            selection,
            "background-color",
            "#1B2730"
          )
        );

        //Font
        setFontFamily(
          $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
        );

        // Update links
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent) || $isLinkNode(node)) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }

        //@ts-ignore
        let matchingParent;
        if ($isLinkNode(parent)) {
          // If node is a link, we need to fetch the parent paragraph node to set format
          matchingParent = $findMatchingParent(
            node,
            (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
          );
        }
      }
    });
  };

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;
          if (!isLink) {
            setIsLinkEditMode(true);
            url = sanitizeUrl("https://");
          } else {
            setIsLinkEditMode(false);
            url = null;
          }
          return editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, isLink, setIsLinkEditMode]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      setIsLinkEditMode(false);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, setIsLinkEditMode]);
  return (
    <div className="w-full bg-slate-600 rounded-lg overflow-x-auto flex flex-row space-x-2 items-center p-1">
      <Element editor={editor} />
      {element !== "codeblock" ? (
        <>
          <Paragraph editor={editor} />
          <Link isLink={isLink} insertLink={insertLink} />
          <FontColor
            editor={editor}
            selectedColor={fontColor}
            setSelectedColor={setFontColor}
          />
          <BgColor
            editor={editor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            textColor={fontColor}
          />

          <FontFamily editor={editor} value={fontFamily} />
          <Image editor={editor} />
          <Youtube editor={editor} />
          <Twitter editor={editor} />
        </>
      ) : (
        <Code
          editor={editor}
          selectedElementKey={selectedElementKey}
          selcetd={codeLanguage}
        />
      )}
      <OnChangePlugin onChange={onchange} />
    </div>
  );
}

export default Toolbar;
