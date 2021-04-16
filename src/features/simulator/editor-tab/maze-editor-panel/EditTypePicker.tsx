import React, { FC } from 'react'
import { ButtonGroup, useRadioGroup } from '@chakra-ui/react'
import RadioButton from '../../common/RadioButton'
import { EditType } from './mazeEditorSlice'

interface EditTypePickerProps {
  value: EditType
  onChange: (value: EditType) => void
}

const EditTypePicker: FC<EditTypePickerProps> = ({ value, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'editType',
    value,
    onChange,
  })

  const group = getRootProps()

  return (
    <ButtonGroup {...group} isAttached>
      <RadioButton
        {...getRadioProps({ value: 'insertWall', enterKeyHint: 'done' })}
        label="Add wall"
      />
      <RadioButton
        {...getRadioProps({ value: 'deleteWall', enterKeyHint: 'done' })}
        label="Delete wall"
      />
      <RadioButton
        {...getRadioProps({ value: 'editGoal', enterKeyHint: 'done' })}
        label="Set goal"
      />
    </ButtonGroup>
  )
}

export default EditTypePicker
