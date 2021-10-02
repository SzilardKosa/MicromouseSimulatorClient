import React, { useState } from 'react'
import { Text, Flex, HStack, BoxProps, useDisclosure } from '@chakra-ui/react'
import LanguagePicker, { LanguageOptions } from './LanguagePicker'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import DeleteConfirmModal from './modals/DeleteConfirmModal'
import AddNewAlgorithmModal from './modals/AddNewAlgorithmModal'
import OpenAlgorithmModal from './modals/OpenAlgorithmModal'
import CodeEditorSettingsModal from './modals/CodeEditorSettingsModal'
import { SimulationDTO } from '../../../../api/gen'

type CodePanelHeaderProps = BoxProps & { simulation: SimulationDTO }

const CodePanelHeader = ({ children, simulation, ...props }: CodePanelHeaderProps) => {
  const [language, setLanguage] = useState<LanguageOptions>('Python')
  const {
    isOpen: isDeleteConfirmModalOpen,
    onOpen: onDeleteConfirmModalOpen,
    onClose: onDeleteConfirmModalClose,
  } = useDisclosure()
  const {
    isOpen: isAddNewAlgorithmModalOpen,
    onOpen: onAddNewAlgorithmModalOpen,
    onClose: onAddNewAlgorithmModalClose,
  } = useDisclosure()
  const {
    isOpen: isOpenAlgorithmModalOpen,
    onOpen: onOpenAlgorithmModalOpen,
    onClose: onOpenAlgorithmModalClose,
  } = useDisclosure()
  const {
    isOpen: isSettingsModalOpen,
    onOpen: onSettingsModalOpen,
    onClose: onSettingsModalClose,
  } = useDisclosure()
  return (
    <>
      <PanelHeader {...props}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">FloodFill_v1.py</Text>
        </Flex>
        <Flex alignItems={'center'}>
          <LanguagePicker value={language} onChange={setLanguage} />
        </Flex>
        <HStack spacing={4} alignItems={'center'}>
          <Settings aria-label="Code Editor Settings" onClick={onSettingsModalOpen} />
          <FileMenu
            onSave={() => console.log('save')}
            onNewFile={onAddNewAlgorithmModalOpen}
            onOpenFile={onOpenAlgorithmModalOpen}
            onDelete={onDeleteConfirmModalOpen}
          />
        </HStack>
      </PanelHeader>

      <DeleteConfirmModal
        header={'Delete Algo'}
        body={'Are you sure?'}
        isOpen={isDeleteConfirmModalOpen}
        onClose={onDeleteConfirmModalClose}
        onConfirm={() => console.log('deleted')}
      />

      <AddNewAlgorithmModal
        onClose={onAddNewAlgorithmModalClose}
        isOpen={isAddNewAlgorithmModalOpen}
        simulation={simulation}
      />

      <OpenAlgorithmModal onClose={onOpenAlgorithmModalClose} isOpen={isOpenAlgorithmModalOpen} />

      <CodeEditorSettingsModal onClose={onSettingsModalClose} isOpen={isSettingsModalOpen} />
    </>
  )
}

export default CodePanelHeader
