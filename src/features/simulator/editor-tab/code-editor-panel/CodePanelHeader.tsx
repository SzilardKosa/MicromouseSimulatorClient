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
import { useDeleteAlgorithm } from '../../../../api/hooks/algorithms'
import { useUpdateSimulation } from '../../../../api/hooks/simulations'

type CodePanelHeaderProps = BoxProps & { simulation: SimulationDTO; algorithm: AlgorithmDTO }

const CodePanelHeader = ({ algorithm, simulation, children, ...props }: CodePanelHeaderProps) => {
  const { mutateAsync: deleteAlgorithm } = useDeleteAlgorithm()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  const onDeleteAlgorithm = async () => {
    await deleteAlgorithm(algorithm.id!!)
    simulation.algorithmId = null
    await updateSimulation(simulation)
  }

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
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
          <Settings aria-label="Code Editor Settings" onClick={onSettingsOpen} />
          <FileMenu
            onSave={() => console.log('save')}
            onNewFile={onCreateOpen}
            onOpenFile={onSearchOpen}
            onDelete={onDeleteOpen}
          />
        </HStack>
      </PanelHeader>

      <DeleteConfirmModal
        header={'Delete algorithm'}
        body={`Are you sure? You can't undo this action afterwards.`}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteAlgorithm}
      />

      <AddNewAlgorithmModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenAlgorithmModal onClose={onSearchClose} isOpen={isSearchOpen} />

      <CodeEditorSettingsModal onClose={onSettingsClose} isOpen={isSettingsOpen} />
    </>
  )
}

export default CodePanelHeader
