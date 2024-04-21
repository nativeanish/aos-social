import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ReactNode } from "react";
interface Props {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  Body: ReactNode;
}
function ModalLC({ title, isOpen, onClose, onOpenChange, Body }: Props) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-[#1B2730] text-white"
        scrollBehavior="inside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{Body}</ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalLC;
