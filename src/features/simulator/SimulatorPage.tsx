import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTab, SimulatorTabs } from './simulatorSlice'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import '../../common/Splitter.css'
import { useRunSimulation, useSimulation } from '../../api/hooks/simulations'
import { Box, Center, Spinner } from '@chakra-ui/react'
import EditorTab from './editor-tab/EditorTab'
import ResultTab from './result-tab/ResultTab'
import ErrorMessageView from '../../common/ErrorMessageView'
import { navbarHeight } from '../../common/consts'

const SimulatorPage = () => {
  const currentTab = useSelector(selectCurrentTab)
  let { id } = useParams<{ id: string }>()
  const { status, data: simulation, error } = useSimulation(id)
  const { isLoading, status: runStatus, mutateAsync: runSimulation } = useRunSimulation()
  let content

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = <ErrorMessageView message={'An error occured while loading the simulation!'} />
  } else if (!simulation) {
    content = <ErrorMessageView message={'Simulation not found!'} />
  } else {
    content = (
      <>
        <Box display={currentTab === SimulatorTabs.Editor ? 'block' : 'none'}>
          <EditorTab simulation={simulation} />
        </Box>
        <Box display={currentTab === SimulatorTabs.Result ? 'block' : 'none'}>
          <ResultTab simulation={simulation} status={runStatus} />
        </Box>
      </>
    )
  }

  return (
    <>
      <Navbar
        simulation={simulation}
        runSimulation={runSimulation}
        isRunning={isLoading}
        position="relative"
        zIndex={2}
      />
      <Box h={`calc(100vh - ${navbarHeight}px)`} w="full" position="absolute">
        {content}
      </Box>
    </>
  )
}

export default SimulatorPage
