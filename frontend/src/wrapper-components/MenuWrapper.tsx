import { FC, ReactNode } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, Icon, IconButton, Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


interface MenuItemProps {
  id: number,
  title: string,
  MenuItemIcon?: React.ElementType,
  command?: string,
  route: string
}

interface MenuWrapperProps {
  isOpen?: boolean,
  outlined?: boolean,
  MenuIcon?: {
    type: React.ElementType,
    name: string,
    color?: string,
    size?: string | number
    spacing?: number | string,
  },
  MenuItems: MenuItemProps[],
  children?: ReactNode
}

const MenuWrapper: FC<MenuWrapperProps> = (props) => {

  const ButtonComponent = props.MenuIcon ? IconButton : Button;
  const iconButtonProps = props.MenuIcon
    ? {
      icon: <props.MenuIcon.type name={props.MenuIcon.name} color={props.MenuIcon.color} size={props.MenuIcon.size} />,
      'aria-label': props.MenuIcon.name,
    }
    : {};
  const isOutlined = props.outlined ? 'outline' : '';

  return (
    <Menu placement='top'>
      <MenuButton
        as={ButtonComponent}
        {...iconButtonProps}
        variant={isOutlined}
      />
      <MenuList>
        {props.MenuItems.map(item =>
          <a key={item.id} href={item.route}>
            <MenuItem key={item.id} icon={ item.MenuItemIcon ? < item.MenuItemIcon /> : undefined } command={item.command} textColor={'black'} >
              {item.title}
            </MenuItem>
          </a>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuWrapper;
