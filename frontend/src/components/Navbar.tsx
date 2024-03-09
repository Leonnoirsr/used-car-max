import { FC } from 'react';
import { Flex, Box, Spacer } from '@chakra-ui/react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: FC<NavbarProps> = () => {
  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      padding="2rem"
      bg="rgba(0, 0, 0, 0.0)"
      color="white"
      margin="0 auto"
      paddingX="2rem"
      position="sticky"
      top="0"
      width="100%"
      zIndex="10"
    >
      {/* Logo Section */}
      <Box paddingLeft={'4'}>
        <a href={'/'}>
          <Logo image={{ src: './ucmlogo.svg', alt: 'Used Car Max Logo' }} />
        </a>
      </Box>

      {/* Spacer will push the search bar and menu items to the center and right respectively */}
      <Spacer />

      {/* Search Bar Section */}
      <Box flex={{ base: 1 }} justifySelf="center">
        <SearchBar />
      </Box>

      <Spacer />

      {/* Menu Items Section */}
      <Flex justify="flex-end" align="center">
        {/* Add your menu items here */}
        <Box marginX="2"></Box>
        <Box marginX="2"><UserMenu /></Box>
        {/* ... other menu items */}
      </Flex>
    </Flex>
  );
};

export default Navbar;
