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
  FormControl,
  Select,
  FormLabel,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFontSize, updateFontSize } from '../codeEditorSlice'
import { fontSizes } from '../consts'

type CodeEditorSettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CodeEditorSettingsModal = ({ isOpen, onClose }: CodeEditorSettingsModalProps) => {
  const fontSize = useSelector(selectFontSize)
  const dispatch = useDispatch()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Code editor settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Font Size</FormLabel>
            <Select
              value={fontSize}
              onChange={(event) => dispatch(updateFontSize(event.target.value))}
            >
              {fontSizes.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CodeEditorSettingsModal
