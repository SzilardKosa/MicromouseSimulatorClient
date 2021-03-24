import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTab, SimulatorTabs } from './simulatorSlice'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import SplitterLayout from 'react-splitter-layout'
import './Splitter.css'
import { Box } from '@chakra-ui/layout'

const SimulatorPage = () => {
  const currentTab = useSelector(selectCurrentTab)
  let { id } = useParams<{ id: string }>()
  console.log(id)

  return (
    <>
      <Navbar />
      <Box h="calc(100vh - 64px)" w="full" position="absolute">
        <Box display={currentTab === SimulatorTabs.Editor ? 'block' : 'none'}>
          <SplitterLayout>
            <Box bg="lightseagreen" h="100%">
              Pane 1
            </Box>
            <Box bg="lightskyblue" h="100%">
              Pane 2
            </Box>
          </SplitterLayout>
        </Box>
        <Box display={currentTab === SimulatorTabs.Result ? 'block' : 'none'}>
          <SplitterLayout vertical>
            <Box bg="lightcoral" h="100%">
              Pane 3
            </Box>
            <Box bg="lightgoldenrodyellow" h="100%">
              Pane 4
            </Box>
          </SplitterLayout>
        </Box>
      </Box>
    </>
  )
}

export default SimulatorPage
