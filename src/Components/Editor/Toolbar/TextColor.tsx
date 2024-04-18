import { LexicalEditor } from "lexical";
import { VscSymbolColor } from "react-icons/vsc";
import { $patchStyleText } from "@lexical/selection";
import { Button, Tooltip } from "@nextui-org/react";
import { Sketch } from "@uiw/react-color";
import { $getSelection } from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
function FontColor({
  editor,
  selectedColor,
  setSelectedColor,
}: {
  editor: LexicalEditor;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        { tag: "historic" }
      );
    },
    [editor]
  );

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        show &&
        !(event.target as HTMLElement).closest(".your-color-picker-container")
      ) {
        setShow(false);
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (show && event.key !== "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [show]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onFontColorSelect(color);
  };

  const calculatePortalPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const portalHeight = 200; // Adjust this value based on the height of your color picker
      const top = buttonRect.top - portalHeight + 180;
      const left = buttonRect.left;
      return { top, left };
    }
    return { top: 0, left: 0 };
  };
  function getTextColor(backgroundColor: string): string {
    // Convert hex color to RGB
    const hexToRgb = (hex: string): number[] => {
      const bigint = parseInt(hex.substring(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    // Calculate perceived luminance
    const rgb = hexToRgb(backgroundColor);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

    // Return light or dark color based on luminance
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
  return (
    <>
      <Tooltip content="Text Color" color="primary">
        <Button
          isIconOnly
          size="sm"
          onClick={() => setShow(true)}
          ref={buttonRef}
          style={{ backgroundColor: selectedColor }}
          variant={
            getTextColor(selectedColor) !== "#000000" ? "solid" : "bordered"
          }
        >
          <VscSymbolColor style={{ color: getTextColor(selectedColor) }} />
        </Button>
      </Tooltip>
      {show
        ? createPortal(
            <div
              className="your-color-picker-container"
              style={{
                position: "fixed",
                top: calculatePortalPosition().top,
                left: calculatePortalPosition().left,
              }}
            >
              <Sketch
                color={selectedColor}
                onChange={(e) => handleColorChange(e.hex)}
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}

export default FontColor;
