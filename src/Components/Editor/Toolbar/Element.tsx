import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import useElement, { element } from "../../../store/useElement";
import { BsTextParagraph } from "react-icons/bs";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuListChecks,
} from "react-icons/lu";
import { RiListOrdered, RiListUnordered } from "react-icons/ri";
import { TbBlockquote } from "react-icons/tb";
import { PiCodeBlockThin } from "react-icons/pi";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListType,
} from "@lexical/list";
import { $createCodeNode } from "@lexical/code";
function Element({ editor }: { editor: LexicalEditor }) {
  const _element = useElement((state) => state.element);
  const activate_para = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  const activate_list = (e: ListType) => {
    if (e === "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else if (e === "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (e === "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      activate_para();
    }
  };

  const activate_quote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };
  const activate_cl = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };
  const activate_heading = (e: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(e));
      }
    });
  };
  const check = (e: (typeof element)[0]) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(e)) {
      activate_heading(e as HeadingTagType);
    } else if (["number", "bullet", "check"].includes(e)) {
      activate_list(e as ListType);
    } else if (e === "quote") {
      activate_quote();
    } else if (e === "codeblock") {
      activate_cl();
    } else {
      activate_para();
    }
  };
  return (
    <>
      <ButtonGroup>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" className="text-white bg-black">
              {_element === "paragraph" ? (
                <BsTextParagraph />
              ) : _element === "h1" ? (
                <LuHeading1 />
              ) : _element === "h2" ? (
                <LuHeading2 />
              ) : _element === "h3" ? (
                <LuHeading3 />
              ) : _element === "h4" ? (
                <LuHeading4 />
              ) : _element === "h5" ? (
                <LuHeading5 />
              ) : _element === "h6" ? (
                <LuHeading6 />
              ) : _element === "number" ? (
                <RiListOrdered />
              ) : _element === "bullet" ? (
                <RiListUnordered />
              ) : _element === "check" ? (
                <LuListChecks />
              ) : _element === "quote" ? (
                <TbBlockquote />
              ) : _element === "codeblock" ? (
                <PiCodeBlockThin />
              ) : null}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Merge options"
            selectionMode="single"
            className="max-w-[300px]"
            onSelectionChange={(e) => check([...e][0] as (typeof element)[0])}
            selectedKeys={[_element]}
            items={element}
          >
            <DropdownItem key="paragraph" startContent={<BsTextParagraph />}>
              Paragraph
            </DropdownItem>
            <DropdownItem key="h1" startContent={<LuHeading1 />}>
              Heading 1
            </DropdownItem>
            <DropdownItem key="h2" startContent={<LuHeading2 />}>
              Heading 2
            </DropdownItem>
            <DropdownItem key="h3" startContent={<LuHeading3 />}>
              Heading 3
            </DropdownItem>
            <DropdownItem key="h4" startContent={<LuHeading4 />}>
              Heading 4
            </DropdownItem>
            <DropdownItem key="h5" startContent={<LuHeading5 />}>
              Heading 5
            </DropdownItem>
            <DropdownItem key="h6" startContent={<LuHeading6 />}>
              Heading 6
            </DropdownItem>
            <DropdownItem key="number" startContent={<RiListOrdered />}>
              Number
            </DropdownItem>
            <DropdownItem key="bullet" startContent={<RiListUnordered />}>
              Bullet
            </DropdownItem>
            <DropdownItem key="check" startContent={<LuListChecks />}>
              Check
            </DropdownItem>
            <DropdownItem key="quote" startContent={<TbBlockquote />}>
              Quote
            </DropdownItem>
            <DropdownItem key="codeblock" startContent={<PiCodeBlockThin />}>
              Code
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </>
  );
}

export default Element;
