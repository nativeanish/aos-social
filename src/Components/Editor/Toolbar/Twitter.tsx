import { Button, Input, Tooltip, useDisclosure } from "@nextui-org/react";
import Modals from "../../Template/Modals";
import { useState } from "react";
import { LexicalEditor } from "lexical";
import { FaXTwitter } from "react-icons/fa6";
import { INSERT_TWITTER_COMMAND } from "../Plugin/Twitter/TwitterPlugin";
function Twitter({ editor }: { editor: LexicalEditor }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip content="Add Tweet" color="primary">
        <Button isIconOnly onPress={onOpen} size="sm">
          <FaXTwitter />
        </Button>
      </Tooltip>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Tweet"
        Body={<Body editor={editor} onClose={onClose} />}
        onClose={onClose}
      />
    </>
  );
}

export default Twitter;
function Body({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");
  const add = () => {
    if (!url) {
      alert("Twitter URL is invalid");
      onClose();
      return;
    }
    editor.dispatchCommand(INSERT_TWITTER_COMMAND, { url: url });
    setUrl("");
    onClose();
  };
  return (
    <>
      <Input
        type="text"
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://twitter.com/elonmusk/status/1767108624038449405"
      />
      <Button onClick={() => add()} color="primary">
        Add
      </Button>
    </>
  );
}
