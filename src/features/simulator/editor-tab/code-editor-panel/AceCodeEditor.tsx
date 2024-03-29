import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import { AlgorithmDTO } from '../../../../api/gen'
import { Languages } from './consts'
import { useSelector } from 'react-redux'
import { selectFontSize } from './codeEditorSlice'
import { useUpdateAlgorithm } from '../../../../api/hooks/algorithms'
import { useColorModeValue } from '@chakra-ui/react'
import { panelHeaderHeight } from '../../../../common/consts'

const languages = ['c_cpp', 'python']
const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
]

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`)
  require(`ace-builds/src-noconflict/snippets/${lang}`)
})

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`))

type AceCodeEditorProps = {
  algorithm: AlgorithmDTO
}

const AceCodeEditor = ({ algorithm }: AceCodeEditorProps) => {
  const fontSize = useSelector(selectFontSize)
  const theme = useColorModeValue('xcode', 'monokai')
  const { mutateAsync: updateAlgorithm } = useUpdateAlgorithm()

  async function onUpdateAlgorithm(newValue: string) {
    try {
      const newAlgorithm: AlgorithmDTO = {
        ...algorithm,
        codeText: newValue,
      }
      await updateAlgorithm(newAlgorithm)
    } catch (error) {
      console.error(error)
    }
  }

  const mode = algorithm.language === Languages.python ? 'python' : 'c_cpp'

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode={mode}
      theme={theme}
      name="ace-editor"
      key={algorithm.codeText}
      defaultValue={algorithm.codeText}
      onChange={onUpdateAlgorithm}
      debounceChangePeriod={1000} // in milisec
      fontSize={fontSize}
      showPrintMargin={false} // line on the right at 100
      showGutter={true} // left side of the editor with the number
      highlightActiveLine={true}
      width={'100%'}
      height={`calc(100% - ${panelHeaderHeight}px)`}
      wrapEnabled={true} //wraping lines
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  )
}

export default AceCodeEditor
