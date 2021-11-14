import React from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useChangePassword } from '../../../api/hooks/users'
import { navbarHeight, validatePassword } from '../../../common/consts'

const SettingsPage = () => {
  const { register, handleSubmit, errors, formState } = useForm()
  const { isError, error, isSuccess, mutateAsync: changePassword } = useChangePassword()

  async function onSubmit(values: any) {
    try {
      await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      h={`calc(100vh - ${navbarHeight}px)`}
      bg={useColorModeValue('gray.100', 'gray.800')}
      w="full"
      justifyContent="center"
    >
      <Stack spacing="8" w="md" maxW={'lg'} py={12} px={6}>
        <Flex justify={'center'}>
          <Heading fontSize={'4xl'}>Change password</Heading>
        </Flex>
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
                  Password successfully changed!
                </Alert>
              )}
              <FormControl id="oldPassword" isInvalid={errors.oldPassword}>
                <FormLabel>Current password</FormLabel>
                <Input type="password" name="oldPassword" ref={register({ required: true })} />
                <FormErrorMessage>
                  {errors.oldPassword && 'Current password is required'}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="newPassword" isInvalid={errors.newPassword}>
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  name="newPassword"
                  ref={register({ validate: validatePassword })}
                />
                <FormErrorMessage>
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SettingsPage
