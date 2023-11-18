import React, { useState } from 'react';
import AppModal            from '../components/AppModal';

export const useModal = ( title: string, route: string ) => {
	
	const [ isOpen, setIsOpen ] = useState( false );
	
	const toggleModal = () => {
		setIsOpen( !isOpen )
	};
	
	const Modal = () => {
		return <AppModal
			isOpen={ isOpen }
			onClose={() => setIsOpen(false)}
			onSignIn={() => {}}
			title={ title }
			primary="Submit"
			secondary="Cancel"
			route={ route }
		
		/>
	};
	
	return [ isOpen, toggleModal, Modal ] as const
	
}