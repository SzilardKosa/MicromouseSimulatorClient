import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-min-noconflict/ext-language_tools'

const languages = ['c_cpp', 'python']
const fontSizes = [14, 16, 18, 20, 24, 28, 32, 40]
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

const AceCodeEditor = () => {
  const onLoad = () => {
    console.log('load')
  }

  function onChange(newValue: string) {
    console.log('change', newValue)
  }

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode={'python'}
      theme={'github'}
      name="ace-editor"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={fontSizes[0]}
      showPrintMargin={false} // line on the right at 100
      showGutter={true} // left side of the editor with the number
      highlightActiveLine={true}
      width={'100%'}
      height={'calc(100% - 48px)'}
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
