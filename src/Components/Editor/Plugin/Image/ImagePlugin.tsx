import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { $createImageNode, ImageNode } from "./ImageNode";

export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  alt: string;
}> = createCommand();
function ImagePlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error(
        "ImagePlugin: ImageNode not registered on editor (initialConfig.nodes)"
      );
    }

    return editor.registerCommand<{ src: string; alt: string }>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const image = $createImageNode(payload.src, payload.alt);
        $insertNodes([image]);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);
  return null;
}

export default ImagePlugin;
