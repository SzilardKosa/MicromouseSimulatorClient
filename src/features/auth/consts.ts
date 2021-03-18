// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const PASSWORD_REGEX = {
  atLeastOneDigit: /[0-9]/,
  atLeastOneLower: /[a-z]/,
  atLeastOneUpper: /[A-Z]/,
  minLength: /^.{8,}$/,
}
