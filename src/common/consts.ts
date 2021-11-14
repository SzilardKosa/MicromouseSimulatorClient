import { useColorModeValue } from '@chakra-ui/react'

export const navbarHeight = 64
export const panelHeaderHeight = 48
export const useErrorColor = () => useColorModeValue('red.700', 'red.300')

export const PASSWORD_REGEX = {
  atLeastOneDigit: /[0-9]/,
  atLeastOneLower: /[a-z]/,
  atLeastOneUpper: /[A-Z]/,
  minLength: /^.{8,}$/,
}

export function validatePassword(value: string) {
  if (!value) {
    return 'Password is required'
  } else if (!PASSWORD_REGEX.atLeastOneDigit.test(value)) {
    return 'Password must contain at least one digit'
  } else if (!PASSWORD_REGEX.atLeastOneLower.test(value)) {
    return 'Password must contain at least one lower case letter'
  } else if (!PASSWORD_REGEX.atLeastOneUpper.test(value)) {
    return 'Password must contain at least one upper case letter'
  } else if (!PASSWORD_REGEX.minLength.test(value)) {
    return 'Password must be at least 8 characters long'
  } else return true
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmail(value: any) {
  if (!value) {
    return 'Email is required'
  } else if (!EMAIL_REGEX.test(String(value).toLowerCase())) {
    return 'Please provide a valid email address'
  } else return true
}
