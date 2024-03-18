import { FC, ReactNode }                                                                  from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Button, useDisclosure }        from '@chakra-ui/react';
import IconWrapper                                                                        from './IconWrapper';



export interface MenuItemProps {

  id: number,
  title: string,
  MenuItemIcon?: React.ElementType,
  command?: string,
  route: string,
  onClick?: () => void

}

interface MenuWrapperProps {

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

  const { isOpen, onOpen, onClose }   = useDisclosure(),
          ButtonComponent             = props.MenuIcon ? IconButton : Button;

  const iconButtonProps = props.MenuIcon
    ? {
      icon: <IconWrapper icon={<props.MenuIcon.type name={props.MenuIcon.name} color={props.MenuIcon.color} />} size={props.MenuIcon.size} />,
      'aria-label': props.MenuIcon.name,
      }
    : {};

    const isOutlined = props.outlined ? 'outline' : '';

  return (

    <Menu placement='top'>
      <MenuButton
        onMouseOver={onOpen}
        onMouseOut={onClose}
        as={ButtonComponent}
        {...iconButtonProps}
        variant={isOutlined} />

      <MenuList>

        {props.MenuItems.map(item =>

          <a key={item.id} href={item.route}>
            <MenuItem key={item.id} icon={ item.MenuItemIcon ? <IconWrapper icon={<item.MenuItemIcon />} size="1.25rem" /> : undefined } command={item.command} textColor={'black'} onClick={item.onClick} >
              {item.title}
            </MenuItem>
          </a>

        )}

      </MenuList>

    </Menu>
  );
};

export default MenuWrapper;
