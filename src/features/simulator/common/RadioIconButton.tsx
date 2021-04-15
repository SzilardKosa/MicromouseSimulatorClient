import React from 'react'
import {
  IconButton,
  useRadio,
  useColorModeValue,
  IconButtonProps,
  UseRadioProps,
  useId,
} from '@chakra-ui/react'

interface RadioIconButtonProps extends UseRadioProps {
  label: string
  icon: IconButtonProps['icon']
}

// source: https://github.com/chakra-ui/chakra-ui/discussions/2385
const RadioIconButton = (props: RadioIconButtonProps) => {
  const id = useId(props.id, `RadioIconButton`)
  const { getInputProps, getCheckboxProps } = useRadio({ id, ...props })

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <>
      <IconButton
        {...checkbox}
        htmlFor={input.id}
        as="label"
        color={useColorModeValue('gray.800', 'white')}
        _checked={{
          bg: useColorModeValue('green.400', 'green.800'),
          color: 'white',
        }}
        size={'md'}
        icon={props.icon}
        aria-label={props.label}
      />
      <input {...input} />
    </>
  )
}

export default RadioIconButton
