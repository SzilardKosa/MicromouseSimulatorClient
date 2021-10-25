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
    step: 23,
    text: '',
  },
  {
    step: 24,
    text: 'its  amubhc lonbger testijsf\n iejiafgidfn its i s tislna gldihjbfg shifjianlfnanfsjf \nf afkja',
  },
  {
    step: 25,
    text: '',
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
    text: 'hello',
  },
  {
    step: 27,
    text: 'hello',
  },
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
    text: 'hello',
  },
  {
    step: 27,
    text: 'hello',
  },
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
    text: 'hello',
  },
  {
    step: 27,
    text: 'hello',
  },
]

const ConsolePanelBody = () => {
  const logs = dummyLogs.map((log) => (
    <HStack spacing={2} alignItems="flex-start">
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
