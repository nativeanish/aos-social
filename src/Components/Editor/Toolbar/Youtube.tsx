import { Button, Input, Tooltip, useDisclosure } from "@nextui-org/react";
import { IoLogoYoutube } from "react-icons/io";
import Modals from "../../Template/Modals";
import { useState } from "react";
import { LexicalEditor } from "lexical";
import { INSERT_YOUTUBE_COMMAND } from "../Plugin/Youtube/YoutubePlugin";
function Youtube({ editor }: { editor: LexicalEditor }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip content="Add Youtube Video" color="primary">
        <Button isIconOnly onPress={onOpen} size="sm">
          <IoLogoYoutube />
        </Button>
      </Tooltip>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Youtube"
        Body={<Body editor={editor} onClose={onClose} />}
        onClose={onClose}
      />
    </>
  );
}

export default Youtube;
function Body({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}) {
  const [video, setVideo] = useState("");
  const add = () => {
    if (!video) {
      alert("Youtube URL is invalid");
      onClose();
      return;
    }
    editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, { src: video });
    setVideo("");
    onClose();
  };
  return (
    <>
      <Input
        type="text"
        onChange={(e) => setVideo(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=reQxl5Rl4tE"
      />
      <Button onClick={() => add()} color="primary">
        Add
      </Button>
    </>
  );
}
