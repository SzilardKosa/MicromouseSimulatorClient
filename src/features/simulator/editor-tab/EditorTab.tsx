import React from 'react'
import SplitterLayout from 'react-splitter-layout'
import { SimulationExpandedDTO } from '../../../api/gen'
import CodeEditorPanel from './code-editor-panel/CodeEditorPanel'
import MazeEditorPanel from './maze-editor-panel/MazeEditorPanel'

type EditorTabProps = { simulation: SimulationExpandedDTO }

const EditorTab = ({ simulation }: EditorTabProps) => {
  return (
    <SplitterLayout percentage secondaryInitialSize={50}>
      <CodeEditorPanel simulation={simulation} />
      <MazeEditorPanel simulation={simulation} />
    </SplitterLayout>
  )
}

export default EditorTab
