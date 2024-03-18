import { FC, useState } from 'react';
import { Button, Container, useDisclosure } from '@chakra-ui/react';
import ModalWrapper from '../../wrapper-components/ModalWrapper';
import * as z from 'zod';

const HomePage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define the form fields for the sign-up form
  const signUpFormFields = [
    { id: 1, name: 'firstName', label: 'First Name', type: 'text' },
    { id: 2, name: 'lastName', label: 'Last Name', type: 'text' },
    { id: 3, name: 'email', label: 'Email', type: 'email' },
    { id: 4, name: 'password', label: 'Password', type: 'password' },
  ];

  // Define the Zod schema for the sign-up form
  const signUpSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    // If you have a confirmPassword field and want to ensure it matches password
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  return (
    <div
      style={{
        backgroundImage: `url(/home.jpg)`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center', // Vertically center the content
        justifyContent: 'center', // Horizontally center the content
      }}
    >
      <Container centerContent>
        <Button colorScheme="teal" size="lg" onClick={onOpen}>
          Sign Up
        </Button>

        {isOpen && (
          <ModalWrapper
            isOpen={isOpen}
            title="Sign Up"
            primaryButton="Register"
            secondaryButton="Cancel"
            hasForm={{ fields: signUpFormFields }}
            formSchema={signUpSchema} // Pass the schema here
            onClose={onClose}
            hasQuery={{
              method: 'POST',
              route: 'http://localhost:3001/api/auth/signup',
              onSuccess: (response) => {
                console.log('Registration successful', response);
                onClose(); // Close the modal on successful registration
              },
              onError: (error) => console.error('Registration failed', error),
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
