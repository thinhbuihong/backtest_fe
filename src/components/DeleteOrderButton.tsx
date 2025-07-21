import React from "react";
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface DeleteOrderButtonProps {
  onDelete: () => void;
  label?: string;
  iconSize?: string | number;
}

const DeleteOrderButton = ({
  onDelete,
  label = "Delete",
  iconSize = "10px",
}: DeleteOrderButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <>
      <IconButton
        aria-label={label}
        icon={<CloseIcon boxSize={iconSize} />}
        size="xs"
        variant="ghost"
        colorScheme="gray"
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
        height="18px"
        minW="18px"
        px={0}
        py={0}
        fontSize={iconSize}
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="md" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this order?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteOrderButton;
