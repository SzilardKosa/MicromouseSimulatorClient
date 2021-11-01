import React from 'react'
import { SimulationExpandedDTO } from '../../../../api/gen'
import NoMouseAssigned from './NoMouseAssigned'
import MouseEditorPanelContent from './MouseEditorPanelContent'

type MouseEditorPanelProps = { simulation: SimulationExpandedDTO }

const MouseEditorPanel = ({ simulation }: MouseEditorPanelProps) => {
  if (!simulation.mouse || !simulation.mouseId) {
    return <NoMouseAssigned simulation={simulation} />
  }

  return <MouseEditorPanelContent simulation={simulation} mouseId={simulation.mouseId} />
}

export default MouseEditorPanel
