import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $insertNodes,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useEffect } from "react";
import { $createTweetNode, TweetNode } from "./TwitterNode";
export const INSERT_TWITTER_COMMAND: LexicalCommand<{
  url: string;
}> = createCommand();
function TwitterPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!editor.hasNodes([TweetNode])) {
      throw new Error(
        "TweetPlugin: TweetNode not registered on editor (initialConfig.nodes)"
      );
    }
    return editor.registerCommand<{ url: string }>(
      INSERT_TWITTER_COMMAND,
      (payload) => {
        const youtube = $createTweetNode(payload.url);
        $insertNodes([youtube]);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);
  return null;
}

export default TwitterPlugin;
