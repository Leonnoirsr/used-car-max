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

interface AppModalProps {
	isOpen: boolean,
	title: string,
	primary: string,
	secondary: string
}

const AppModalDefaultProps: AppModalProps = {
	isOpen:    false,
	title:     '',
	primary:   '',
	secondary: ''
}

const AppModal: React.FC<AppModalProps> = ( props ) => {
	
	const [ isOpen, setIsOpen ] = useState( false );
	const onClose               = () => setIsOpen( false );
	
	return (
		<>
			<Modal isOpen={ isOpen } onClose={ onClose }>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>{ props.title }</ModalHeader>
					<ModalCloseButton/>
					<ModalBody>
						<FormControl id='email'>
							<FormLabel>Email Address</FormLabel>
							<Input type='email'/>
						</FormControl>
						
						<FormControl id='password' mt={ 4 }>
							<FormLabel>Password</FormLabel>
							<Input type='email'/>
						</FormControl>
					</ModalBody>
					
					<ModalFooter>
						<Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
							{ props.primary }
						</Button>
						<Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
							{ props.secondary }
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export {
	AppModal,
	AppModalDefaultProps,
};