import React, { FC } from 'react'
import { ButtonGroup, useRadioGroup } from '@chakra-ui/react'
import RadioButton from '../../common/RadioButton'

export type SizeOptions = 'full' | 'half'

interface SizeTypePickerProps {
  value: SizeOptions
  onChange: (value: SizeOptions) => void
}

const SizeTypePicker: FC<SizeTypePickerProps> = ({ value, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'size',
    value,
    onChange,
  })

  const group = getRootProps()

  return (
    <ButtonGroup {...group} isAttached>
      <RadioButton {...getRadioProps({ value: 'full', enterKeyHint: 'done' })} label="Full" />
      <RadioButton {...getRadioProps({ value: 'half', enterKeyHint: 'done' })} label="Half" />
    </ButtonGroup>
  )
}

export default SizeTypePicker
