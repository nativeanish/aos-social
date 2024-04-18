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
function Modals({ title, isOpen, onClose, onOpenChange, Body }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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

export default Modals;
