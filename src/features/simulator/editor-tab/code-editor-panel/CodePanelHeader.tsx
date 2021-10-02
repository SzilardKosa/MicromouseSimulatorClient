import React from 'react'
import { Text, Flex, HStack, BoxProps, useDisclosure } from '@chakra-ui/react'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import DeleteConfirmModal from './modals/DeleteConfirmModal'
import AddNewAlgorithmModal from './modals/AddNewAlgorithmModal'
import OpenAlgorithmModal from './modals/OpenAlgorithmModal'
import CodeEditorSettingsModal from './modals/CodeEditorSettingsModal'
import { AlgorithmDTO, SimulationDTO } from '../../../../api/gen'
import LanguageIcon, { LanguageOptions } from './LanguageIcon'

type CodePanelHeaderProps = BoxProps & { simulation: SimulationDTO; algorithm: AlgorithmDTO }

const CodePanelHeader = ({ algorithm, simulation, children, ...props }: CodePanelHeaderProps) => {
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
          <Text fontWeight="medium">{algorithm.name}</Text>
        </Flex>
        <Flex alignItems={'center'}>
          <LanguageIcon language={algorithm.language as LanguageOptions} />
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
