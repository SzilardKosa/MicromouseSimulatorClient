import React, { FC } from 'react'
import { ButtonGroup, Icon, useRadioGroup } from '@chakra-ui/react'
import RadioIconButton from './RadioIconButton'
import { SiC, SiCplusplus, SiPython } from 'react-icons/si'

export type LanguageOptions = 'Python' | 'C' | 'C++'

interface LanguagePickerProps {
  value: LanguageOptions
  onChange: (value: LanguageOptions) => void
}

const LanguagePicker: FC<LanguagePickerProps> = ({ value, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'language',
    value,
    onChange,
  })

  const group = getRootProps()

  return (
    <ButtonGroup {...group} isAttached>
      <RadioIconButton
        {...getRadioProps({ value: 'Python', enterKeyHint: 'done' })} // typescipt error for enterKeyHint!!
        label="Python"
        icon={<Icon w={5} h={5} as={SiPython} />}
      />
      <RadioIconButton
        {...getRadioProps({ value: 'C', enterKeyHint: 'done' })} // typescipt error for enterKeyHint!!
        label="C"
        icon={<Icon w={5} h={5} as={SiC} />}
      />
      <RadioIconButton
        {...getRadioProps({ value: 'C++', enterKeyHint: 'done' })} // typescipt error for enterKeyHint!!
        label="C++"
        icon={<Icon w={5} h={5} as={SiCplusplus} />}
      />
    </ButtonGroup>
  )
}

export default LanguagePicker
