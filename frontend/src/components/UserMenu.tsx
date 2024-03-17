import { FC, useState, useEffect }                                     from 'react';
import { UnregisteredUserMenu, RegisteredUserMenu, AdminUserMenu }     from '../constants/menuitems';
import { Avatar }                                                      from '@chakra-ui/react';
import { GoPerson }                                                    from 'react-icons/go';
import { jwtDecode, JwtPayload }                                       from 'jwt-decode';
import { MenuItemProps }                                               from '../wrapper-components/MenuWrapper';
import { useNavigate }                                                 from 'react-router-dom';
import MenuWrapper                                                     from '../wrapper-components/MenuWrapper';
import axios                                                           from 'axios';



interface CustomJwtPayload extends JwtPayload {
  firstName?: string,
  lastName?: string,
  role?: string;
}

const UserMenu: FC = (props) => {

  const switchMenu = (menuType: 'unregistered' | 'registered' | 'admin') => {

    let menuItems;
    switch(menuType) {
      case 'registered':
        menuItems = RegisteredUserMenu.map(item =>
          item.title === 'Log Out' ? { ...item, onClick: handleLogout } : item
        );
        break;
      case 'admin':
        menuItems = AdminUserMenu.map(item =>
          item.title === 'Log Out' ? { ...item, onClick: handleLogout } : item
        );
        break;
      default:
        menuItems = UnregisteredUserMenu;
    }
    setMenuItems(menuItems);
  };

  const [user, setUser]                       = useState(null),
        [ MenuItems, setMenuItems] = useState<MenuItemProps[]>(UnregisteredUserMenu),
        navigate                                                 = useNavigate()

  const handleLogout = async () => {
    try {
      // Optionally make a request to the backend to handle server-side logout
      await axios.post('http://localhost:3001/api/auth/signout');

      localStorage.removeItem('authToken');

      navigate('/signout')
    }
    catch (error) {
      console.error('Logout failed', error);
    }
  };


  useEffect(() => {


    const token = localStorage.getItem('authToken');

    if (token) {
      const decode    = jwtDecode<CustomJwtPayload>(token),
            { firstName, lastName, role } = decode,
            initials             = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;




      // Determine the menu type based on the user role
      let menuType: 'unregistered' | 'registered' | 'admin';
      switch (role) {
        case 'ADMIN':
          menuType = 'admin';
          break;
        case 'USER':
          menuType = 'registered';
          break;
        default:
          menuType = 'unregistered';
      }

      // Use the switchMenu function to dynamically set the MenuItems
      switchMenu(menuType);
}


  }, []);

  return (
    <MenuWrapper MenuItems={MenuItems} MenuIcon={{ type: GoPerson, name: 'avatar', color: 'black', size: '27px' }} />
  );
};

export default UserMenu;
