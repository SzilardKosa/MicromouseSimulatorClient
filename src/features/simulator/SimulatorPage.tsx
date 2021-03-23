import React from 'react'
import { useParams } from 'react-router-dom'

const SimulatorPage = () => {
  let { id } = useParams<{ id: string }>()
  console.log(id)

  return <div>Sim page</div>
}

export default SimulatorPage
