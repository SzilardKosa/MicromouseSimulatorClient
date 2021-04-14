import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTab, SimulatorTabs } from './simulatorSlice'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import SplitterLayout from 'react-splitter-layout'
import '../../common/Splitter.css'
import { Box } from '@chakra-ui/layout'
import CodeEditorPanel from './editor-tab/code-editor-panel/CodeEditorPanel'
import MazeEditorPanel from './editor-tab/maze-editor-panel/MazeEditorPanel'
import MazeViewerPanel from './result-tab/maze-viewer-panel/MazeViewerPanel'
import StatsPanel from './result-tab/stats-panel/StatsPanel'
import MouseEditorPanel from './result-tab/mouse-editor-panel/MouseEditorPanel'
import ConsolePanel from './result-tab/console-panel/ConsolePanel'

const SimulatorPage = () => {
  const currentTab = useSelector(selectCurrentTab)
  let { id } = useParams<{ id: string }>()
  console.log(id)

  return (
    <>
      <Navbar position="relative" zIndex={2} />
      <Box h="calc(100vh - 64px)" w="full" position="absolute">
        <Box display={currentTab === SimulatorTabs.Editor ? 'block' : 'none'}>
          <SplitterLayout percentage secondaryInitialSize={50}>
            <CodeEditorPanel />
            <MazeEditorPanel />
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
      </Box>
    </>
  )
}

export default SimulatorPage
