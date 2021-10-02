import React from 'react'
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { MdFolder, MdSave } from 'react-icons/md'

type FileMenuProps = {
  onSave?: () => void
  onNewFile?: () => void
  onOpenFile?: () => void
  onDelete?: () => void
}

const FileMenu = ({ onSave, onNewFile, onOpenFile, onDelete }: FileMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="File menu"
        icon={<Icon w={5} h={5} as={MdFolder} />}
        size="md"
      />
      <MenuList>
        <MenuItem onClick={onSave} icon={<Icon as={MdSave} />} command="Ctrl+S">
          Save
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={onNewFile} icon={<AddIcon />} command="Ctrl+N">
          New File
        </MenuItem>
        <MenuItem onClick={onOpenFile} icon={<EditIcon />} command="Ctrl+O">
          Open File...
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={onDelete} icon={<DeleteIcon />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileMenu
