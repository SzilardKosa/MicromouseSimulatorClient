import React, { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, useColorModeValue } from '@chakra-ui/react'

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={RouterLink}
    to={to}
  >
    {children}
  </Link>
)

export default NavLink
