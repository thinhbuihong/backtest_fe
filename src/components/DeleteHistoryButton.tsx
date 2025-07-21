import React, { useRef } from "react";
import {
  Button,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface DeleteHistoryButtonProps {
  values: any;
  setValues: any;
}

const DeleteHistoryButton = ({
  values,
  setValues,
}: DeleteHistoryButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const handleDelete = () => {
    setValues({ ...values, orders: [], balance: values.initial });
    onClose();
  };
  return (
    <>
      <IconButton
        aria-label="Delete all history"
        icon={<DeleteIcon />}
        ml={2}
        colorScheme="red"
        variant="ghost"
        onClick={onOpen}
        isDisabled={values.orders.length === 0}
        title="Delete all history"
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete History
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete all profit/loss history? This
              action cannot be undone.
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

export default DeleteHistoryButton;
