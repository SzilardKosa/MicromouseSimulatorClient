import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentTab, changeTab, SimulatorTabs } from './simulatorSlice'
import { useHistory } from 'react-router-dom'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
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
import { UseMutateAsyncFunction } from 'react-query'
import { AxiosResponse } from 'axios'
import { SimulationDTO, SimulationExpandedDTO, SimulationResultDTO } from '../../api/gen'
import { useUpdateSimulation } from '../../api/hooks/simulations'

type NavbarProps = BoxProps & {
  simulation?: SimulationExpandedDTO
  runSimulation: UseMutateAsyncFunction<
    AxiosResponse<SimulationResultDTO>,
    unknown,
    string,
    unknown
  >
  isRunning: boolean
}

const Navbar = ({ simulation, runSimulation, isRunning, ...etc }: NavbarProps) => {
  const currentTab = useSelector(selectCurrentTab)
  const dispatch = useDispatch()
  let history = useHistory()
  const iconButtonColor = useColorModeValue('gray.800', 'white')
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  const iconButtonProps: Omit<IconButtonProps, 'aria-label'> = {
    variant: 'ghost',
    colorScheme: 'blackAlpha',
    color: iconButtonColor,
    size: 'md',
  }

  const onRunSimulation = async () => {
    if (simulation == null) return
    try {
      const result = await runSimulation(simulation.id!)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdateSimulation = async (newName: string) => {
    if (simulation == null) return
    try {
      const newSimulation: SimulationDTO = {
        ...simulation,
        name: newName,
      }
      await updateSimulation(newSimulation)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box bg={useColorModeValue('green.400', 'green.800')} px={4} shadow="base" {...etc}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={4} alignItems={'center'}>
          <IconButton
            {...iconButtonProps}
            icon={<ArrowBackIcon w={5} h={5} />}
            aria-label={'Back to list'}
            onClick={() => history.push('/workspace/simulations')}
          />
          {simulation && (
            <Editable
              defaultValue={simulation.name}
              key={simulation.name}
              onSubmit={onUpdateSimulation}
            >
              <EditablePreview fontWeight="bold" />
              <EditableInput />
            </Editable>
          )}
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
            onClick={onRunSimulation}
            isLoading={isRunning}
          />
          <DarkLightSwitch {...iconButtonProps} />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
