import React, { useState } from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	Input,
	ModalFooter
}                          from '@chakra-ui/react';

import axios from 'axios';

interface AppModalProps {
	isOpen: boolean,
	onClose: () => void,
	title: string,
	primary: string,
	secondary: string,
	route: string,
	onSignIn: () => void
}


const AppModal: React.FC<AppModalProps> = ( props ) => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	
	const handlePrimaryClick =  async () => {
	try {
		const response = await axios.post(props.route, {
			email,
			password
		});
		if(response.status === 200) {
			props.onSignIn();
		}
		props.onClose()
	} catch (error) {
		console.error('There was an error!', error);
	}
	}
	
	return (
		<>
			<Modal isOpen={ props.isOpen } onClose={ props.onClose }>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>{ props.title }</ModalHeader>
					<ModalCloseButton/>
					<ModalBody>
						<FormControl id='email'>
							<FormLabel>Email Address</FormLabel>
							<Input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
						</FormControl>
						
						<FormControl id='password' mt={ 4 }>
							<FormLabel>Password</FormLabel>
							<Input type='email' value={password} onChange={e => setPassword(e.target.value)}/>
						</FormControl>
					</ModalBody>
					
					<ModalFooter>
						<Button colorScheme='blue' mr={ 3 } onClick={handlePrimaryClick}>
							{ props.primary }
						</Button>
						<Button colorScheme='blue' mr={ 3 } onClick={props.onClose}>
							{ props.secondary }
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AppModal