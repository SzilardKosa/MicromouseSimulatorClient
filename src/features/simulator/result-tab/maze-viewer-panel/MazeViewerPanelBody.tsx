import React from 'react'
import { useSelector } from 'react-redux'
import { Center } from '@chakra-ui/react'
import MazeViewerHUD from './MazeViewerHUD'
import MazeViewerCanvas from './MazeViewerCanvas'
import { selectMazeViewerInput, selectSimulationId } from '../resultSlice'
import ErrorMessageView from '../../../../common/ErrorMessageView'
import { SimulationExpandedDTO } from '../../../../api/gen'
import { panelHeaderHeight } from '../../../../common/consts'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

type MazeViewerPanelBodyProps = { simulation: SimulationExpandedDTO }

const MazeViewerPanelBody = ({ simulation }: MazeViewerPanelBodyProps) => {
  const mazeViewerInput = useSelector(selectMazeViewerInput)
  const simulationId = useSelector(selectSimulationId)
  if (mazeViewerInput == null || simulation.id !== simulationId) {
    return (
      <Center h={`calc(100% - ${panelHeaderHeight}px)`} overflow="hidden" position="relative">
        <ErrorMessageView message={'Nothing to show yet!'} />
      </Center>
    )
  }

  return (
    <Center
      h={`calc(100% - ${panelHeaderHeight}px)`}
      w="full"
      overflow="hidden"
      position="relative"
    >
      <MazeViewerHUD />
      <TransformWrapper initialScale={0.2} minScale={0.1} centerOnInit={true}>
        <TransformComponent
          wrapperStyle={{
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <MazeViewerCanvas {...mazeViewerInput} />
        </TransformComponent>
      </TransformWrapper>
    </Center>
  )
}

export default MazeViewerPanelBody
