import { Button, Tooltip } from "@nextui-org/react";
import { FaLink } from "react-icons/fa";

function Link({
  isLink,
  insertLink,
}: {
  isLink: boolean;
  insertLink: () => void;
}) {
  return (
    <>
      <Tooltip content="Insert Link" placement="top" color="primary">
        <Button
          onClick={insertLink}
          size="sm"
          isIconOnly
          color={isLink ? "primary" : "default"}
        >
          <FaLink />
        </Button>
      </Tooltip>
    </>
  );
}

export default Link;
