import { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import { UnlockIcon, EditIcon } from '@chakra-ui/icons';
import { GoPerson } from 'react-icons/go';
import MenuWrapper from '../wrapper-components/MenuWrapper';

interface NavMenuProps {
  isOpen? : boolean
}

const UserMenu: FC<NavMenuProps> = (props) => {


  const MenuItems = [
    {
      id: 1,
      title: 'Log In',
      MenuItemIcon: UnlockIcon,
      route: '/login'
    },
    {
      id: 2,
      title: 'Register',
      MenuItemIcon: EditIcon,
      route: '/register'
    },
  ];

  return (
    <MenuWrapper MenuItems={MenuItems} MenuIcon={{ type: GoPerson, name: 'avatar', color: 'black', size: '27px' }} />
  );
};

export default UserMenu;
