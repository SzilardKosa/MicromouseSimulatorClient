import React from 'react'
import { useSelector } from 'react-redux'
import { Center } from '@chakra-ui/react'
import MazeViewerHUD from './MazeViewerHUD'
import MazeViewerCanvas from './MazeViewerCanvas'
import { selectMazeViewerInput, selectSimulationId } from '../resultSlice'
import ErrorMessageView from '../../../../common/ErrorMessageView'
import { SimulationExpandedDTO } from '../../../../api/gen'
import { panelHeaderHeight } from '../../../../common/consts'

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
    <Center h={`calc(100% - ${panelHeaderHeight}px)`} overflow="hidden" position="relative">
      <MazeViewerHUD />
      <MazeViewerCanvas {...mazeViewerInput} />
    </Center>
  )
}

export default MazeViewerPanelBody
