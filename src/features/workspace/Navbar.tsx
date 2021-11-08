import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NavLink from './NavLink'
import DarkLightSwitch from '../../common/DarkLightSwitch'
import { logout } from '../auth/authSlice'

const Navbar = () => {
  let { url } = useRouteMatch()
  let history = useHistory()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        position="relative"
        zIndex={2}
        px={4}
        shadow="base"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ base: 'inherit', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontWeight="bold">Micromouse Simulator</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink to={`${url}/simulations`}>Simulations</NavLink>
              <NavLink to={`${url}/help`}>Help</NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <DarkLightSwitch size={'md'} mr={4} />
            <Menu>
              <MenuButton
                as={Button}
                size={'sm'}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
              >
                <Avatar size={'sm'} src={'meh'} />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to={`${url}/settings`}>
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={onLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen && (
          <Box display={{ base: 'inherit', md: 'none' }} pb={4}>
            <Stack as={'nav'} spacing={4}>
              <NavLink to={`${url}/simulations`}>Simulations</NavLink>
              <NavLink to={`${url}/help`}>Help</NavLink>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  )
}

export default Navbar
