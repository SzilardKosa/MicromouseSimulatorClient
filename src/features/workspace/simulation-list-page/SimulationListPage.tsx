import React from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { useSimulations } from '../../../api/hooks/simulations'
import SimulationList from './SimulationList'
import ErrorMessageView from '../../../common/ErrorMessageView'
import { navbarHeight } from '../../../common/consts'

const SimulationListPage = () => {
  const { status, data, error } = useSimulations()
  let content

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = <ErrorMessageView message={'An error occured while loading the simulations!'} />
  } else {
    content = <SimulationList simulations={data ?? []} />
  }

  return (
    <Box h={`calc(100vh - ${navbarHeight}px)`} w="full" position="relative">
      {content}
    </Box>
  )
}

export default SimulationListPage
