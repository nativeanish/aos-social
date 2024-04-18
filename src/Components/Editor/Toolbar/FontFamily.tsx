import { $patchStyleText } from "@lexical/selection";
import { $getSelection, LexicalEditor } from "lexical";
import { useCallback } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
  ["Tac One", "Tac One"],
  ["Bungee Spice", "Bungee Spice"],
  ["Frijole", "Frijole"],
  ["Rock Salt", "Rock Salt"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];
export function FontFamily({
  value,
  editor,
}: {
  value: string;
  editor: LexicalEditor;
}): JSX.Element {
  const style = "font-family";
  const handleClick = useCallback(
    (option: string) => {
      console.log(option);
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style]
  );

  return (
    <>
      <ButtonGroup>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              color="primary"
              className="text-white bg-black p-2"
              style={{ fontFamily: value }}
            >
              {value}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Font Select"
            selectionMode="single"
            className="max-w-[300px]"
            onSelectionChange={(e) => handleClick([...e][0] as string)}
          >
            {(style === "font-family"
              ? FONT_FAMILY_OPTIONS
              : FONT_SIZE_OPTIONS
            ).map(([option, text]) => (
              <DropdownItem
                key={option}
                value={option}
                style={{ fontFamily: option }}
              >
                {text}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </>
  );
}
