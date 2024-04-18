import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { $createYoutubeNode, YoutubeNode } from "./YoutubeNode";
export const INSERT_YOUTUBE_COMMAND: LexicalCommand<{
  src: string;
}> = createCommand();
function YoutubePlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([YoutubeNode])) {
      throw new Error(
        "YoutubePlugin: YoutubeNode not registered on editor (initialConfig.nodes)"
      );
    }
    return editor.registerCommand<{ src: string; alt: string }>(
      INSERT_YOUTUBE_COMMAND,
      (payload) => {
        const youtube = $createYoutubeNode(payload.src);
        $insertNodes([youtube]);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);
  return null;
}

export default YoutubePlugin;
