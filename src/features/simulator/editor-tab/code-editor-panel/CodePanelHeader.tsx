import React from 'react'
import {
  Flex,
  HStack,
  BoxProps,
  useDisclosure,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import SettingsButton from '../../common/SettingsButton'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import DeleteConfirmModal from '../../../../common/DeleteConfirmModal'
import AddNewAlgorithmModal from './modals/AddNewAlgorithmModal'
import OpenAlgorithmModal from './modals/OpenAlgorithmModal'
import CodeEditorSettingsModal from './modals/CodeEditorSettingsModal'
import { AlgorithmDTO, SimulationDTO } from '../../../../api/gen'
import LanguageIcon from './LanguageIcon'
import { useDeleteAlgorithm, useUpdateAlgorithm } from '../../../../api/hooks/algorithms'
import { useUpdateSimulation } from '../../../../api/hooks/simulations'
import { Languages } from './consts'

type CodePanelHeaderProps = BoxProps & { simulation: SimulationDTO; algorithm: AlgorithmDTO }

const CodePanelHeader = ({ algorithm, simulation, children, ...props }: CodePanelHeaderProps) => {
  const { mutateAsync: deleteAlgorithm } = useDeleteAlgorithm()
  const { mutateAsync: updateAlgorithm } = useUpdateAlgorithm()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  const onDeleteAlgorithm = async () => {
    await deleteAlgorithm(algorithm.id)
    const newSimulation: SimulationDTO = {
      id: simulation.id,
      algorithmId: null,
      mazeId: simulation.mazeId,
      mouseId: simulation.mouseId,
      name: simulation.name,
    }
    await updateSimulation(newSimulation)
  }

  const onUpdateAlgorithm = async (newName: string) => {
    try {
      const newAlgorithm: AlgorithmDTO = {
        id: algorithm.id,
        name: newName,
        codeText: algorithm.codeText,
        language: algorithm.language,
      }
      await updateAlgorithm(newAlgorithm)
    } catch (error) {
      console.error(error)
    }
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
          <Editable defaultValue={algorithm.name} key={algorithm.name} onSubmit={onUpdateAlgorithm}>
            <EditablePreview fontWeight="medium" />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex alignItems={'center'}>
          <LanguageIcon language={algorithm.language as Languages} />
        </Flex>
        <HStack spacing={4} alignItems={'center'}>
          <SettingsButton aria-label="Code Editor Settings" onClick={onSettingsOpen} />
          <FileMenu onNewFile={onCreateOpen} onOpenFile={onSearchOpen} onDelete={onDeleteOpen} />
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

      <OpenAlgorithmModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />

      <CodeEditorSettingsModal onClose={onSettingsClose} isOpen={isSettingsOpen} />
    </>
  )
}

export default CodePanelHeader
