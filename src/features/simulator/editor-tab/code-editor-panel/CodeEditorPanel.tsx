import React from 'react'
import PanelHeader from './PanelHeader'
import AceCodeEditor from './AceCodeEditor'

const CodeEditorPanel = () => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1} />
      <AceCodeEditor />
    </>
  )
}

export default CodeEditorPanel
