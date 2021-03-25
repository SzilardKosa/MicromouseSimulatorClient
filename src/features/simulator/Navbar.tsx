import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentTab, changeTab, SimulatorTabs } from './simulatorSlice'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import DarkLightSwitch from '../../common/DarkLightSwitch'
import { MdPlayArrow } from 'react-icons/md'

const Navbar = () => {
  const currentTab = useSelector(selectCurrentTab)
  const dispatch = useDispatch()
  let history = useHistory()
  const iconButtonColor = useColorModeValue('gray.800', 'white')

  const iconButtonProps: Omit<IconButtonProps, 'aria-label'> = {
    variant: 'ghost',
    colorScheme: 'blackAlpha',
    color: iconButtonColor,
    size: 'md',
  }

  return (
    <>
      <Box bg={useColorModeValue('green.400', 'green.800')} px={4} shadow="base">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={4} alignItems={'center'}>
            <IconButton
              {...iconButtonProps}
              icon={<ArrowBackIcon w={5} h={5} />}
              aria-label={'Back to list'}
              onClick={() => history.push('/workspace/simulations')}
            />
            <Box fontWeight="bold">Simulator</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <ButtonGroup isAttached>
              <Button
                variant={currentTab === SimulatorTabs.Editor ? 'solid' : 'outline'}
                onClick={() => dispatch(changeTab(SimulatorTabs.Editor))}
              >
                Editor
              </Button>
              <Button
                variant={currentTab === SimulatorTabs.Result ? 'solid' : 'outline'}
                onClick={() => dispatch(changeTab(SimulatorTabs.Result))}
              >
                Result
              </Button>
            </ButtonGroup>
          </Flex>
          <HStack spacing={4} alignItems={'center'}>
            <IconButton
              {...iconButtonProps}
              icon={<Icon w={5} h={5} as={MdPlayArrow} />}
              aria-label={'Run simulation'}
              onClick={() => console.log('simulation finished')}
            />
            <DarkLightSwitch {...iconButtonProps} />
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
