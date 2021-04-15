import React from 'react'
import CodePanelHeader from './CodePanelHeader'
import AceCodeEditor from './AceCodeEditor'

const CodeEditorPanel = () => {
  return (
    <>
      <CodePanelHeader position="relative" zIndex={1} />
      <AceCodeEditor />
    </>
  )
}

export default CodeEditorPanel
