import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useRegister } from '../../api/hooks/auth'
import { validateEmail, validatePassword } from '../../common/consts'

const SignUpPage = () => {
  const { register, handleSubmit, errors, formState } = useForm()
  const { isError, isSuccess, error, mutateAsync: registerUser } = useRegister()

  async function onSubmit(values: any) {
    try {
      await registerUser({ email: values.email, password: values.password })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Center minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing="8" w="md" maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create a new account</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link color={'blue.400'} as={RouterLink} to="/">
              features
            </Link>{' '}
            ✌️
          </Text> */}
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {isError && (
                <Alert status="error">
                  <AlertIcon />
                  {error && error.response?.data}
                </Alert>
              )}
              {isSuccess && (
                <Alert status="success">
                  <AlertIcon />
                  Account successfully created!
                </Alert>
              )}
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
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'}>
                  <Text>Already have an account? </Text>
                  <Link as={RouterLink} to="/login" color={'blue.400'}>
                    Log in
                  </Link>
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
                  Create account
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  )
}

export default SignUpPage
