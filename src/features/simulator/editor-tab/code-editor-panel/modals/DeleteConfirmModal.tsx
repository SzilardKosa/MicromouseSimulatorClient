import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

type DeleteConfirmModalProps = {
  header: string
  body: string
  onConfirm?: () => Promise<void>
  isOpen: boolean
  onClose: () => void
}

const DeleteConfirmModal = ({
  header,
  body,
  onConfirm,
  isOpen,
  onClose,
}: DeleteConfirmModalProps) => {
  const cancelRef = React.useRef<any>()

  const handleConfirm = async () => {
    try {
      if (onConfirm) await onConfirm()
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteConfirmModal
