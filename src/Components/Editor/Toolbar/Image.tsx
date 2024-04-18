import {
  Button,
  Input,
  Tooltip,
  useDisclosure,
  Image as Images,
} from "@nextui-org/react";
import { LexicalEditor } from "lexical";
import { FaImage } from "react-icons/fa";
import Modals from "../../Template/Modals";
import { ChangeEvent, useState } from "react";
import { INSERT_IMAGE_COMMAND } from "../Plugin/Image/ImagePlugin";

function Image({ editor }: { editor: LexicalEditor }) {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
  return (
    <>
      <Tooltip color="primary" content="Upload an Image">
        <Button size="sm" isIconOnly onPress={onOpen}>
          <FaImage />
        </Button>
      </Tooltip>
      <Modals
        title="Insert Image"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        Body={<ImgBody editor={editor} onClose={onClose} />}
      />
    </>
  );
}

export function ImgBody({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}) {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setResult(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  const upload = () => {
    if (text.length) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: result, alt: text });
      setResult("");
      setText("");
      onClose();
    } else {
      alert("Please add alt text");
    }
  };
  return (
    <>
      {result.length ? (
        <>
          <div className="flex items-center justify-center">
            <Images
              src={result}
              alt={text}
              className="aspect-video w-full p-4 m-2"
            />
          </div>
          <Input
            type="text"
            placeholder="Alt text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Button type="button" color="danger" onPress={() => setResult("")}>
            Remove
          </Button>
          <Button type="button" color="primary" onClick={() => upload()}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={handleImageChange}
          />

          <div className="mt-1 text-sm text-black" id="user_avatar_help">
            Image should be in Aspect 16:9 and must be less than 500KiB
          </div>
        </>
      )}
    </>
  );
}
export default Image;
