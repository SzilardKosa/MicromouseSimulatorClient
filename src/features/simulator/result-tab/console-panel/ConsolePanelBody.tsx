import React from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

interface Log {
  step: number
  text: string
}

const dummyLogs: Log[] = [
  {
    step: 23,
    text: 'hello',
  },
  {
    step: 24,
    text: 'its  amubhc lonbger testijsf\n iejiafgidfn its i s tislna gldihjbfg shifjianlfnanfsjf \nf afkja',
  },
  {
    step: 25,
    text: 'hello',
  },
  {
    step: 26,
    text: '',
  },
  {
    step: 27,
    text: 'hello',
  },
  {
    step: 28,
    text: '',
  },
  {
    step: 29,
    text: 'its  amubhc lonbger testijsf\n iejiafgidfn its i s tislna gldihjbfg shifjianlfnanfsjf \nf afkja',
  },
  {
    step: 30,
    text: '',
  },
  {
    step: 31,
    text: '',
  },
  {
    step: 32,
    text: 'hello',
  },
  {
    step: 33,
    text: 'hello',
  },
  {
    step: 34,
    text: 'its  amubhc lonbger testijsf\n iejiafgidfn its i s tislna gldihjbfg shifjianlfnanfsjf \nf afkja',
  },
  {
    step: 35,
    text: 'hello',
  },
  {
    step: 36,
    text: 'hello',
  },
  {
    step: 37,
    text: 'hello',
  },
  {
    step: 38,
    text: 'hello',
  },
  {
    step: 39,
    text: 'its  amubhc lonbger testijsf\n iejiafgidfn its i s tislna gldihjbfg shifjianlfnanfsjf \nf afkja',
  },
]

const ConsolePanelBody = () => {
  const logs = dummyLogs.map((log) => (
    <HStack spacing={2} alignItems="flex-start" key={log.step}>
      <Text color="gray.500" fontWeight="semibold">
        {log.step}
      </Text>
      <Text whiteSpace="pre">{log.text}</Text>
    </HStack>
  ))

  return (
    <Box h="calc(100% - 48px)" overflowY="auto" p={4}>
      <VStack spacing={3} align="stretch">
        {logs}
      </VStack>
    </Box>
  )
}

export default ConsolePanelBody
