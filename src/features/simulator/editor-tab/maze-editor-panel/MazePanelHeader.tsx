import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  Flex,
  HStack,
  BoxProps,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import SizeTypePicker, { SizeOptions } from './SizeTypePicker'
import SettingsButton from '../../common/SettingsButton'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import { selectCols, selectRows, setCols, setRows } from './mazeEditorSlice'
import { MazeDTO, SimulationDTO } from '../../../../api/gen'
import { useDeleteMaze, useUpdateMazeOptimistically } from '../../../../api/hooks/mazes'
import { useUpdateSimulation } from '../../../../api/hooks/simulations'
import DeleteConfirmModal from '../../common/DeleteConfirmModal'
import AddNewMazeModal from './modals/AddNewMazeModal'
import OpenMazeModal from './modals/OpenMazeModal'
import MazeEditorSettingsModal from './modals/MazeEditorSettingsModal'

type MazePanelHeaderProps = BoxProps & { simulation: SimulationDTO; maze: MazeDTO }

const MazePanelHeader = ({ maze, simulation, children, ...props }: MazePanelHeaderProps) => {
  const rows = useSelector(selectRows)
  const cols = useSelector(selectCols)
  const dispatch = useDispatch()
  const { mutateAsync: deleteMaze } = useDeleteMaze()
  const { mutateAsync: updateMaze } = useUpdateMazeOptimistically()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  const onDeleteMaze = async () => {
    await deleteMaze(maze.id!!)
    const newSimulation: SimulationDTO = {
      id: simulation.id,
      algorithmId: simulation.algorithmId,
      mazeId: null,
      mouseId: simulation.mouseId,
      name: simulation.name,
    }
    await updateSimulation(newSimulation)
  }

  const onUpdateMaze = async (newMaze: MazeDTO) => {
    try {
      await updateMaze(newMaze)
    } catch (error) {
      console.error(error)
    }
  }

  const getMazeDeepCopy = () => {
    const newMaze: MazeDTO = {
      ...maze,
      goalArea: {
        topLeft: {
          ...maze.goalArea.topLeft,
        },
        bottomRight: {
          ...maze.goalArea.bottomRight,
        },
      },
    }
    return newMaze
  }

  const onUpdateName = async (newName: string) => {
    const newMaze = getMazeDeepCopy()
    newMaze.name = newName
    await onUpdateMaze(newMaze)
  }

  const onUpdateIsFullSize = async (isFullSize: SizeOptions) => {
    const newMaze = getMazeDeepCopy()
    newMaze.isFullSize = isFullSize === 'full'
    await onUpdateMaze(newMaze)
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
          <Editable defaultValue={maze.name} key={maze.name} onSubmit={onUpdateName}>
            <EditablePreview fontWeight="medium" />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex alignItems={'center'}>
          <SizeTypePicker value={maze.isFullSize ? 'full' : 'half'} onChange={onUpdateIsFullSize} />
        </Flex>
        <HStack spacing={4} alignItems={'center'}>
          <HStack spacing={2} alignItems={'center'}>
            <Text>H:</Text>
            <NumberInput
              value={rows}
              onChange={(value) => dispatch(setRows(parseInt(value)))}
              size="md"
              maxW={20}
              step={1}
              defaultValue={16}
              min={1}
              max={32}
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack spacing={2} alignItems={'center'}>
            <Text>W:</Text>
            <NumberInput
              value={cols}
              onChange={(value) => dispatch(setCols(parseInt(value)))}
              size="md"
              maxW={20}
              step={1}
              defaultValue={16}
              min={1}
              max={32}
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </HStack>
        <HStack spacing={4} alignItems={'center'}>
          <SettingsButton aria-label="Maze Editor Settings" onClick={onSettingsOpen} />
          <FileMenu onNewFile={onCreateOpen} onOpenFile={onSearchOpen} onDelete={onDeleteOpen} />
        </HStack>
      </PanelHeader>

      <DeleteConfirmModal
        header={'Delete maze'}
        body={`Are you sure? You can't undo this action afterwards.`}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteMaze}
      />

      <AddNewMazeModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenMazeModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />

      <MazeEditorSettingsModal onClose={onSettingsClose} isOpen={isSettingsOpen} />
    </>
  )
}

export default MazePanelHeader
