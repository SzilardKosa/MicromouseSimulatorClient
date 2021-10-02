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

type CodeEditorSettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CodeEditorSettingsModal = ({ isOpen, onClose }: CodeEditorSettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Code editor settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Change the settings here</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" type="submit" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CodeEditorSettingsModal
