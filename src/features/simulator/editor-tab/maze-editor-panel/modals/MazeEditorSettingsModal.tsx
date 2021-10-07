import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

type MazeEditorSettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

const MazeEditorSettingsModal = ({ isOpen, onClose }: MazeEditorSettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Maze editor settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Settings</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MazeEditorSettingsModal
