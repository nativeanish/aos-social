import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import {
  FaBold,
  FaCode,
  FaFont,
  FaHighlighter,
  FaItalic,
  FaStrikethrough,
  FaSubscript,
  FaSuperscript,
  FaUnderline,
} from "react-icons/fa";
import useParagraph from "../../../store/useParagraph";
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { useEffect, useState } from "react";
function Paragraph({ editor }: { editor: LexicalEditor }) {
  const bold = useParagraph((state) => state.bold);
  const italic = useParagraph((state) => state.itatlic);
  const underline = useParagraph((state) => state.underline);
  const strikethrough = useParagraph((state) => state.strikethrough);
  const code = useParagraph((state) => state.code);
  const highlight = useParagraph((state) => state.highlight);
  const superscript = useParagraph((state) => state.superscript);
  const subscript = useParagraph((state) => state.subscript);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  // Function to check if any element is true and update selectedNames array
  const updateSelectedNames = (name: string, value: boolean) => {
    if (value) {
      setSelectedNames((prevNames) => [...prevNames, name]);
    } else {
      setSelectedNames((prevNames) =>
        prevNames.filter((item) => item !== name)
      );
    }
  };
  useEffect(() => {
    updateSelectedNames("strikethrough", strikethrough);
    updateSelectedNames("highlight", highlight);
    updateSelectedNames("superscript", superscript);
    updateSelectedNames("subscript", subscript);
  }, [strikethrough, highlight, subscript, superscript]);
  return (
    <>
      <Tooltip content="Bold" color="primary">
        <Button
          isIconOnly
          size="sm"
          variant={"solid"}
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          color={bold ? "primary" : "default"}
        >
          <FaBold />
        </Button>
      </Tooltip>
      <Tooltip content="Italic" color="primary">
        <Button
          isIconOnly
          size="sm"
          variant={"solid"}
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          color={italic ? "primary" : "default"}
        >
          <FaItalic />
        </Button>
      </Tooltip>
      <Tooltip content="Underline" color="primary">
        <Button
          isIconOnly
          size="sm"
          variant={"solid"}
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          color={underline ? "primary" : "default"}
        >
          <FaUnderline />
        </Button>
      </Tooltip>
      <Tooltip content="Code" color="primary">
        <Button
          isIconOnly
          size="sm"
          variant={"solid"}
          onPress={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
          color={code ? "primary" : "default"}
        >
          <FaCode />
        </Button>
      </Tooltip>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            color={selectedNames.length ? "primary" : "default"}
            className="space-x-1"
          >
            {!selectedNames.length ? (
              <FaFont />
            ) : (
              <>
                {selectedNames.filter((e) => e === "superscript").length ? (
                  <FaSuperscript />
                ) : null}
                {selectedNames.filter((e) => e === "subscript").length ? (
                  <FaSubscript />
                ) : null}
                {selectedNames.filter((e) => e === "strikethrough").length ? (
                  <FaStrikethrough />
                ) : null}
                {selectedNames.filter((e) => e === "highlight").length ? (
                  <FaHighlighter />
                ) : null}
              </>
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="text decoration"
          selectionMode="multiple"
          selectedKeys={selectedNames}
          // onSelectionChange={setSelectedKeys}
          closeOnSelect={false}
        >
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
            }
            startContent={<FaSuperscript />}
            key={"superscript"}
          >
            SuperScript
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
            }
            startContent={<FaSubscript />}
            key={"subscript"}
          >
            SubScript
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }
            startContent={<FaStrikethrough />}
            key={"strikethrough"}
          >
            Strikethrough
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
            }
            startContent={<FaHighlighter />}
            key={"highlight"}
          >
            Highlight
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default Paragraph;
