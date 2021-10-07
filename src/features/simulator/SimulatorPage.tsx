import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTab, SimulatorTabs } from './simulatorSlice'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import '../../common/Splitter.css'
import SplitterLayout from 'react-splitter-layout'
import CodeEditorPanel from './editor-tab/code-editor-panel/CodeEditorPanel'
import MazeEditorPanel from './editor-tab/maze-editor-panel/MazeEditorPanel'
import MazeViewerPanel from './result-tab/maze-viewer-panel/MazeViewerPanel'
import StatsPanel from './result-tab/stats-panel/StatsPanel'
import MouseEditorPanel from './result-tab/mouse-editor-panel/MouseEditorPanel'
import ConsolePanel from './result-tab/console-panel/ConsolePanel'
import { useSimulation } from '../../api/hooks/simulations'
import { Box, Center, Spinner, useColorModeValue, Text } from '@chakra-ui/react'

const SimulatorPage = () => {
  const currentTab = useSelector(selectCurrentTab)
  let { id } = useParams<{ id: string }>()
  const { status, data: simulation, error } = useSimulation(id)
  const errorColor = useColorModeValue('red.700', 'red.300')
  let content

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          An error occured while loading the simulation!
        </Text>
      </Center>
    )
  } else if (!simulation) {
    content = (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          Simulation not found!
        </Text>
      </Center>
    )
  } else {
    content = (
      <>
        <Box display={currentTab === SimulatorTabs.Editor ? 'block' : 'none'}>
          <SplitterLayout percentage secondaryInitialSize={50}>
            <CodeEditorPanel simulation={simulation} />
            <MazeEditorPanel simulation={simulation} />
          </SplitterLayout>
        </Box>
        <Box display={currentTab === SimulatorTabs.Result ? 'block' : 'none'}>
          <SplitterLayout percentage secondaryInitialSize={40}>
            <SplitterLayout percentage vertical secondaryInitialSize={30}>
              <MazeViewerPanel />
              <ConsolePanel />
            </SplitterLayout>
            <SplitterLayout percentage vertical secondaryInitialSize={40}>
              <StatsPanel />
              <MouseEditorPanel />
            </SplitterLayout>
          </SplitterLayout>
        </Box>
      </>
    )
  }

  return (
    <>
      <Navbar position="relative" zIndex={2} />
      <Box h="calc(100vh - 64px)" w="full" position="absolute">
        {content}
      </Box>
    </>
  )
}

export default SimulatorPage
