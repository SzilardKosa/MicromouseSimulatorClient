import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  Spacer,
  IconButton,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { MdDelete, MdCode } from 'react-icons/md'
import { SimulationExpandedDTO } from '../../../api/gen'

type SimulationListItemProps = { simulation: SimulationExpandedDTO } & BoxProps

const SimulationListItem = ({ simulation, ...boxProps }: SimulationListItemProps) => (
  <Box
    p="4"
    rounded="lg"
    shadow="base"
    _hover={{ shadow: 'md' }}
    role="group"
    bg={useColorModeValue('white', 'gray.900')}
    {...boxProps}
  >
    <Text>{simulation.name}</Text>
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

export default SimulationListItem
