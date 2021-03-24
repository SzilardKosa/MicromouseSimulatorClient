import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import SplitterLayout from 'react-splitter-layout'
import './Splitter.css'
import { Box } from '@chakra-ui/layout'

const SimulatorPage = () => {
  let { id } = useParams<{ id: string }>()
  console.log(id)

  return (
    <>
      <Navbar />
      <Box h="calc(100vh - 64px)" w="full" position="absolute">
        <SplitterLayout>
          <Box bg="lightseagreen" h="100%">
            Pane 1
          </Box>
          <Box bg="lightskyblue" h="100%">
            Pane 2
          </Box>
        </SplitterLayout>
      </Box>
    </>
  )
}

export default SimulatorPage
