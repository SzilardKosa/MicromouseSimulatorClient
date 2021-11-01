import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import SplitterLayout from 'react-splitter-layout'
import { SimulationExpandedDTO } from '../../../api/gen'
import ConsolePanel from './console-panel/ConsolePanel'
import MazeViewerPanel from './maze-viewer-panel/MazeViewerPanel'
import MouseEditorPanel from './mouse-editor-panel/MouseEditorPanel'
import StatsPanel from './stats-panel/StatsPanel'
import { Center, Spinner, Text, VStack } from '@chakra-ui/react'
import ErrorMessageView from '../../../common/ErrorMessageView'

type ResultTabProps = {
  simulation: SimulationExpandedDTO
  status: 'error' | 'idle' | 'loading' | 'success'
}

const ResultTab = ({ simulation, status }: ResultTabProps) => {
  const colorMode = useColorModeValue('light', 'dark')
  const maxHeight = 'calc(100vh - 64px)'

  if (status === 'loading') {
    return (
      <Center h={maxHeight}>
        <VStack spacing={2}>
          <Text fontSize="md">Please wait the simulation is running on the server!</Text>
          <Spinner />
        </VStack>
      </Center>
    )
  }

  if (status === 'error') {
    return (
      <Center h={maxHeight} p={2}>
        <ErrorMessageView
          message={
            'An error occured while loading the result! Make sure you have strong internet connection!'
          }
        />
      </Center>
    )
  }

  return (
    <SplitterLayout percentage secondaryInitialSize={40} customClassName={colorMode}>
      <SplitterLayout percentage vertical secondaryInitialSize={30} customClassName={colorMode}>
        <MazeViewerPanel />
        <ConsolePanel />
      </SplitterLayout>
      <SplitterLayout percentage vertical secondaryInitialSize={40} customClassName={colorMode}>
        <StatsPanel />
        <MouseEditorPanel simulation={simulation} />
      </SplitterLayout>
    </SplitterLayout>
  )
}

export default ResultTab
