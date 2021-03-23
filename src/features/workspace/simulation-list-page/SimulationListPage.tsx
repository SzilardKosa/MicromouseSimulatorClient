import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  Spacer,
  SimpleGrid,
  IconButton,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { MdDelete, MdCode } from 'react-icons/md'

const Card = (props: BoxProps) => (
  <Box
    p="4"
    rounded="lg"
    shadow="base"
    _hover={{ shadow: 'md' }}
    role="group"
    bg={useColorModeValue('white', 'gray.900')}
    {...props}
  >
    <Text>Simulation 1</Text>
    <Flex paddingTop="4">
      <IconButton
        as={RouterLink}
        to={'/simulator/1234'}
        aria-label="Edit simulation"
        size="sm"
        variant="ghost"
        visibility="hidden"
        _groupHover={{ visibility: 'visible' }}
        transition="background 250ms"
        icon={<Icon w={5} h={5} as={MdCode} />}
      />
      <Spacer />
      <IconButton
        aria-label="Delete simulation"
        size="sm"
        variant="ghost"
        visibility="hidden"
        _groupHover={{ visibility: 'visible' }}
        transition="background 250ms"
        icon={<Icon w={5} h={5} as={MdDelete} color={'red.500'} />}
      />
    </Flex>
  </Box>
)

const SimulationListPage = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </SimpleGrid>
    </Box>
  )
}

export default SimulationListPage
