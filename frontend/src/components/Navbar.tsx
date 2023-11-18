import React, { useState } from 'react';
import { Box, Link, Flex, Button, Heading } from '@chakra-ui/react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  
  return (
      <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="blue.800"
          color="yellow.300"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            Used Car Max
          </Heading>
        </Flex>
        
        <Box
            display="flex"
            width="auto"
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={1}
            color="white"
        >
          <Box marginLeft={2}>
            <Link onClick={onOpen}>Sign Up</Link>
          </Box>
          <Box marginLeft={2}>
            <Link href="/signin">Sign In</Link>
          </Box>
        </Box>
      </Flex>
  );
};

export default Navbar;