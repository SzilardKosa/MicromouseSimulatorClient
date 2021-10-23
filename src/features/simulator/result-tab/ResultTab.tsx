import React from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import SplitterLayout from 'react-splitter-layout'
import { SimulationExpandedDTO } from '../../../api/gen'
import ConsolePanel from './console-panel/ConsolePanel'
import MazeViewerPanel from './maze-viewer-panel/MazeViewerPanel'
import MouseEditorPanel from './mouse-editor-panel/MouseEditorPanel'
import StatsPanel from './stats-panel/StatsPanel'

type ResultTabProps = { simulation: SimulationExpandedDTO }

const ResultTab = ({ simulation }: ResultTabProps) => {
  return (
    <SplitterLayout
      percentage
      secondaryInitialSize={40}
      customClassName={useColorModeValue('light', 'dark')}
    >
      <SplitterLayout
        percentage
        vertical
        secondaryInitialSize={30}
        customClassName={useColorModeValue('light', 'dark')}
      >
        <MazeViewerPanel />
        <ConsolePanel />
      </SplitterLayout>
      <SplitterLayout
        percentage
        vertical
        secondaryInitialSize={40}
        customClassName={useColorModeValue('light', 'dark')}
      >
        <StatsPanel />
        <MouseEditorPanel />
      </SplitterLayout>
    </SplitterLayout>
  )
}

export default ResultTab
