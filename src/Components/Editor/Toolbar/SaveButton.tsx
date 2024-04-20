import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@nextui-org/react";
import { savePost } from "../../../utils/ao/post";

function SaveButton() {
  const [editor] = useLexicalComposerContext();
  const onSave = () => {
    savePost(JSON.stringify(editor.getEditorState().toJSON()))
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button
        size="sm"
        className="text-md mt-1"
        color="primary"
        variant="solid"
        onClick={onSave}
      >
        Post
      </Button>
    </div>
  );
}

export default SaveButton;
