import React from 'react'
import { Button, ButtonProps, useRadio, useColorModeValue, UseRadioProps } from '@chakra-ui/react'

interface RadioButtonProps extends UseRadioProps {
  label: string
  leftIcon?: ButtonProps['leftIcon']
}

// source: https://github.com/chakra-ui/chakra-ui/discussions/2385
const RadioButton = (props: RadioButtonProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <>
      <Button
        {...checkbox}
        as="label"
        color={useColorModeValue('gray.800', 'white')}
        _checked={{
          bg: useColorModeValue('green.400', 'green.800'),
          color: 'white',
        }}
        size={'md'}
        leftIcon={props.leftIcon}
      >
        {props.label}
        <input {...input} />
      </Button>
    </>
  )
}

export default RadioButton
