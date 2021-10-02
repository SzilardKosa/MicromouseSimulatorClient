import React from 'react'
import CodePanelHeader from './CodePanelHeader'
import AceCodeEditor from './AceCodeEditor'
import { SimulationExpandedDTO } from '../../../../api/gen'
import NoAlgorithmAssigned from './NoAlgorithmAssigned'

type CodeEditorPanelProps = { simulation: SimulationExpandedDTO }

const CodeEditorPanel = ({ simulation }: CodeEditorPanelProps) => {
  const algorithm = simulation.algorithm

  if (!algorithm) {
    return <NoAlgorithmAssigned simulation={simulation} />
  }

  return (
    <>
      <CodePanelHeader position="relative" zIndex={1} simulation={simulation} />
      <AceCodeEditor />
    </>
  )
}

export default CodeEditorPanel
