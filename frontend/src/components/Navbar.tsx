import React, { useState }                  from 'react';
import { Box, Link, Flex, Button, Heading } from '@chakra-ui/react';
import { useModal } from '../hooks/useModal'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ( {} ) => {

	const [isSignUpOpen, toggleSignUpModal, SignUpModal] = useModal("Signz Up", `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`);
	const [isSignInOpen, toggleSignInModal, SignInModal] = useModal("Signz In", `${process.env.REACT_APP_API_BASE_URL}/api/auth/signin`);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	
	
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
			<Flex align="center" mr={ 5 }>
				<Heading as="h1" size="lg" letterSpacing={ "-.1rem" }>
					Used Car Max
				</Heading>
			</Flex>
			
			<Box
				display="flex"
				width="auto"
				alignItems="center"
				justifyContent="flex-end"
				flexGrow={ 1 }
				color="white"
			>
				<Box marginLeft={ 2 }>
					<Link onClick={(e) => {e.preventDefault(); toggleSignUpModal();}} href="/signup">Sign Up</Link>
				</Box>
				<Box marginLeft={ 2 }>
					{isUserLoggedIn ? (
						<Link onClick={() => {}}>Sign Out</Link>
					) : (
						 <Link onClick={(e) => {e.preventDefault(); toggleSignInModal();}} href="/signin">Sign In</Link>
					 )}
				</Box>
			</Box>
			
			<SignUpModal />
			<SignInModal />
		
		</Flex>
	);
};

export default Navbar;