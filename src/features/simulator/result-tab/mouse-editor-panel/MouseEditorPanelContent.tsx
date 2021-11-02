import React from 'react'
import { useDispatch } from 'react-redux'
import { Center, Spinner } from '@chakra-ui/react'
import { MouseDTO, SimulationExpandedDTO } from '../../../../api/gen'
import MousePanelHeader from './MousePanelHeader'
import { setMouse } from '../resultSlice'
import { useMouse } from '../../../../api/hooks/mice'
import ErrorMessageView from '../../../../common/ErrorMessageView'
import MousePanelBody from './MousePanelBody'

type MouseEditorPanelContentProps = {
  simulation: SimulationExpandedDTO
  mouseId: string
}

const MouseEditorPanelContent = ({ simulation, mouseId }: MouseEditorPanelContentProps) => {
  const dispatch = useDispatch()
  const updateStore = (mouse: MouseDTO) => {
    dispatch(setMouse(mouse))
  }
  const { status, data: mouse, error } = useMouse({ id: mouseId, onSuccess: updateStore })

  if (status === 'loading') {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    )
  }

  if (status === 'error') {
    console.error(error)
    return <ErrorMessageView message={'An error occured while loading the mouse!'} />
  }

  if (!mouse) {
    return <ErrorMessageView message={'Mouse not found!'} />
  }

  return (
    <>
      <MousePanelHeader position="relative" zIndex={1} simulation={simulation} mouse={mouse} />
      <MousePanelBody mouse={mouse} />
    </>
  )
}

export default MouseEditorPanelContent
