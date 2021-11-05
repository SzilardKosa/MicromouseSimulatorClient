import React from 'react'
import {
  Center,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from '@chakra-ui/react'
import { MouseDTO } from '../../../../api/gen'
import { useUpdateMouseOptimistically } from '../../../../api/hooks/mice'
import { panelHeaderHeight } from '../../../../common/consts'

type MousePanelBodyProps = {
  mouse: MouseDTO
}

const MousePanelBody = ({ mouse }: MousePanelBodyProps) => {
  const { mutateAsync: updateMouse } = useUpdateMouseOptimistically()

  const onUpdateMouse = async (newMouse: MouseDTO) => {
    try {
      await updateMouse(newMouse)
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdateAcceleration = async (newAcceleration: string) => {
    const newMouse: MouseDTO = {
      ...mouse,
      acceleration: parseFloat(newAcceleration),
    }
    await onUpdateMouse(newMouse)
  }

  const onUpdateDeceleration = async (newDeceleration: string) => {
    const newMouse: MouseDTO = {
      ...mouse,
      deceleration: parseFloat(newDeceleration),
    }
    await onUpdateMouse(newMouse)
  }

  const onUpdateMaxSpeed = async (newMaxSpeed: string) => {
    const newMouse: MouseDTO = {
      ...mouse,
      maxSpeed: parseFloat(newMaxSpeed),
    }
    await onUpdateMouse(newMouse)
  }

  const onUpdateTurnTime = async (newTurnTime: string) => {
    const newMouse: MouseDTO = {
      ...mouse,
      turnTime: parseFloat(newTurnTime),
    }
    await onUpdateMouse(newMouse)
  }

  return (
    <Center h={`calc(100% - ${panelHeaderHeight}px)`} w="full" position="relative">
      <SimpleGrid columns={3} gap="1" alignItems="center" justifyItems="center">
        <Text justifySelf="end">Acceleration:</Text>
        <NumberInput
          value={mouse.acceleration}
          onChange={onUpdateAcceleration}
          size="md"
          maxW={20}
          step={0.1}
          min={0.01}
          max={50}
          precision={2}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text justifySelf="start">
          m/s<sup>2</sup>
        </Text>
        <Text justifySelf="end">Deceleration:</Text>
        <NumberInput
          value={mouse.deceleration}
          onChange={onUpdateDeceleration}
          size="md"
          maxW={20}
          step={0.1}
          min={0.01}
          max={50}
          precision={2}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text justifySelf="start">
          m/s<sup>2</sup>
        </Text>
        <Text justifySelf="end">Max Speed:</Text>
        <NumberInput
          value={mouse.maxSpeed}
          onChange={onUpdateMaxSpeed}
          size="md"
          maxW={20}
          step={0.1}
          min={0.01}
          max={50}
          precision={2}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text justifySelf="start">m/s</Text>
        <Text justifySelf="end">Turn Time:</Text>
        <NumberInput
          value={mouse.turnTime}
          onChange={onUpdateTurnTime}
          size="md"
          maxW={20}
          step={0.1}
          min={0.01}
          max={30}
          precision={2}
          allowMouseWheel
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text justifySelf="start">s</Text>
      </SimpleGrid>
    </Center>
  )
}

export default MousePanelBody
