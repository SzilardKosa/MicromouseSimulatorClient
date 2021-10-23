import React from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import SplitterLayout from 'react-splitter-layout'
import { SimulationExpandedDTO } from '../../../api/gen'
import CodeEditorPanel from './code-editor-panel/CodeEditorPanel'
import MazeEditorPanel from './maze-editor-panel/MazeEditorPanel'

type EditorTabProps = { simulation: SimulationExpandedDTO }

const EditorTab = ({ simulation }: EditorTabProps) => {
  return (
    <SplitterLayout
      percentage
      secondaryInitialSize={50}
      customClassName={useColorModeValue('light', 'dark')}
    >
      <CodeEditorPanel simulation={simulation} />
      <MazeEditorPanel simulation={simulation} />
    </SplitterLayout>
  )
}

export default EditorTab
