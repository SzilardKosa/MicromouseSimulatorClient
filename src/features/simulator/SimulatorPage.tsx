import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTab, SimulatorTabs } from './simulatorSlice'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import '../../common/Splitter.css'
import { useSimulation } from '../../api/hooks/simulations'
import { Box, Center, Spinner, useColorModeValue, Text } from '@chakra-ui/react'
import EditorTab from './editor-tab/EditorTab'
import ResultTab from './result-tab/ResultTab'

const SimulatorPage = () => {
  const currentTab = useSelector(selectCurrentTab)
  let { id } = useParams<{ id: string }>()
  const { status, data: simulation, error } = useSimulation(id)
  const errorColor = useColorModeValue('red.700', 'red.300')
  let content

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          An error occured while loading the simulation!
        </Text>
      </Center>
    )
  } else if (!simulation) {
    content = (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          Simulation not found!
        </Text>
      </Center>
    )
  } else {
    content = (
      <>
        <Box display={currentTab === SimulatorTabs.Editor ? 'block' : 'none'}>
          <EditorTab simulation={simulation} />
        </Box>
        <Box display={currentTab === SimulatorTabs.Result ? 'block' : 'none'}>
          <ResultTab simulation={simulation} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Navbar position="relative" zIndex={2} />
      <Box h="calc(100vh - 64px)" w="full" position="absolute">
        {content}
      </Box>
    </>
  )
}

export default SimulatorPage
