import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { EMAIL_REGEX } from './consts'

const LogInPage = () => {
  const { register, handleSubmit, errors, formState } = useForm()
  let history = useHistory()

  function validateEmail(value: any) {
    if (!value) {
      return 'Email is required'
    } else if (!EMAIL_REGEX.test(String(value).toLowerCase())) {
      return 'Please provide a valid email address'
    } else return true
  }

  function validatePassword(value: any) {
    if (!value) {
      return 'Password is required'
    } else return true
  }

  function onSubmit(values: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2))
        history.replace('/workspace')
        resolve()
      }, 3000)
    })
  }

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing="8" w="md" maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link color={'blue.400'} as={RouterLink} to="/">
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" ref={register({ validate: validateEmail })} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  ref={register({ validate: validatePassword })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Text>
                    No account?{' '}
                    <Link as={RouterLink} to="/signup" color={'blue.400'}>
                      Create one
                    </Link>
                  </Text>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Log in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  )
}

export default LogInPage
