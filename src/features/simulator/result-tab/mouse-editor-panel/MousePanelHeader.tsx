import React from 'react'
import {
  Flex,
  BoxProps,
  useDisclosure,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import { MouseDTO, SimulationDTO } from '../../../../api/gen'
import { useDeleteMouse, useUpdateMouseOptimistically } from '../../../../api/hooks/mice'
import { useUpdateSimulation } from '../../../../api/hooks/simulations'
import DeleteConfirmModal from '../../common/DeleteConfirmModal'
import AddNewMouseModal from './modals/AddNewMouseModal'
import OpenMouseModal from './modals/OpenMouseModal'

type MousePanelHeaderProps = BoxProps & { simulation: SimulationDTO; mouse: MouseDTO }

const MousePanelHeader = ({ mouse, simulation, children, ...props }: MousePanelHeaderProps) => {
  const { mutateAsync: deleteMouse } = useDeleteMouse()
  const { mutateAsync: updateMouse } = useUpdateMouseOptimistically()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  const onDeleteMouse = async () => {
    await deleteMouse(mouse.id!)
    const newSimulation: SimulationDTO = {
      ...simulation,
      mouseId: null,
    }
    await updateSimulation(newSimulation)
  }

  const onUpdateMouse = async (newName: string) => {
    try {
      const newMouse: MouseDTO = {
        ...mouse,
        name: newName,
      }
      await updateMouse(newMouse)
    } catch (error) {
      console.error(error)
    }
  }

  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()
  return (
    <>
      <PanelHeader {...props}>
        <Flex alignItems={'center'}>
          <Editable defaultValue={mouse.name} key={mouse.name} onSubmit={onUpdateMouse}>
            <EditablePreview fontWeight="medium" />
            <EditableInput />
          </Editable>
        </Flex>
        <Flex alignItems={'center'}>
          <FileMenu onNewFile={onCreateOpen} onOpenFile={onSearchOpen} onDelete={onDeleteOpen} />
        </Flex>
      </PanelHeader>

      <DeleteConfirmModal
        header={'Delete mouse'}
        body={`Are you sure? You can't undo this action afterwards.`}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={onDeleteMouse}
      />

      <AddNewMouseModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenMouseModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />
    </>
  )
}

export default MousePanelHeader
