import React, { useEffect, useRef } from 'react'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { selectConsoleInput } from '../resultSlice'
import { useSelector } from 'react-redux'
import ErrorMessageView from '../../../../common/ErrorMessageView'

const ConsolePanelBody = () => {
  const consoleLogs = useSelector(selectConsoleInput)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [consoleLogs])

  if (consoleLogs == null) {
    return (
      <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
        <ErrorMessageView message={'Nothing to show yet!'} />
      </Center>
    )
  }

  const logs = consoleLogs.map((log) => {
    return (
      log.text && (
        <HStack spacing={2} alignItems="flex-start" key={log.step}>
          <Text color="gray.500" fontWeight="semibold">
            {log.step}
          </Text>
          <Text whiteSpace="pre">{log.text}</Text>
        </HStack>
      )
    )
  })

  return (
    <Box h="calc(100% - 48px)" overflowY="auto" p={4}>
      <VStack spacing={3} align="stretch">
        {logs}
      </VStack>
      <Box ref={logsEndRef} />
    </Box>
  )
}

export default ConsolePanelBody
