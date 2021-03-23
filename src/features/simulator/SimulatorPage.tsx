import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'

const SimulatorPage = () => {
  let { id } = useParams<{ id: string }>()
  console.log(id)

  return (
    <>
      <Navbar />
      <div>Sim page</div>
    </>
  )
}

export default SimulatorPage
