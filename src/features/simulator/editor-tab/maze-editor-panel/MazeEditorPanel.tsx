import React from 'react'
import { SimulationExpandedDTO } from '../../../../api/gen'
import NoMazeAssigned from './NoMazeAssigned'
import MazeEditorPanelContent from './MazeEditorPanelContent'

type MazeEditorPanelProps = { simulation: SimulationExpandedDTO }

const MazeEditorPanel = ({ simulation }: MazeEditorPanelProps) => {
  if (!simulation.maze || simulation.mazeId == null) {
    return <NoMazeAssigned simulation={simulation} />
  }

  return <MazeEditorPanelContent simulation={simulation} mazeId={simulation.mazeId} />
}

export default MazeEditorPanel
