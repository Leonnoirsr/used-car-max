import { FC } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  FormHelperText,
} from '@chakra-ui/react';


interface RegistrationPageProps {
  // Define your props here
}

interface FormValues {
  email: string,
  password: string,
  confirmPassword: string,
}

const RegistrationPage: FC<RegistrationPageProps> = (props) => {

  const schema = z.object({
    email: z.string().email({ message: 'Email is required' }).min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const parsedData = schema.parse(data);
      const response = await axios.post('http://localhost:3001/api/auth/signup', parsedData);
      reset({ email: '', password: '', confirmPassword: '' });
      console.log(response.data);
    } catch (error) {
      console.log(data);
      console.error(error);
    }
  };


  return (

    <div style={{
      height: '100vh',
    }}>
      <Container mt={'6rem'}>

        <Box mb={'5rem'} w={'sm'} bg="white">
          <Heading colorScheme={'facebook'} color={'#003366'}>
            Create an account
          </Heading>

          <br />

          <p>To continue create a Used CarMax Account</p>
        </Box>

        <Box>
          <FormControl id="email" isRequired isInvalid={errors.email && true}>
            <FormLabel htmlFor={'email'}>Email</FormLabel>
            <Input {...register('email')} id="email" type="email" />
            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
          </FormControl>


          <FormControl id="password" isRequired isInvalid={errors.password && true}>
            <FormLabel htmlFor={'password'}>Password</FormLabel>
            <Input {...register('password')} id={'password'} type="password" />
            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
          </FormControl>


          <FormControl id="confirmPassword" isRequired isInvalid={errors.confirmPassword && true}>
            <FormLabel htmlFor={'confirmPassword'}>Confirm Password</FormLabel>
            <Input {...register('confirmPassword')} id={'confirmPassword'} type="password" />
            <FormHelperText>Include a minimum of 8 characters and at least one number and one letter. No spaces,
              please.</FormHelperText>
            {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
          </FormControl>

          <Button
            mt="4"
            disabled={isSubmitting}
            size={'lg'}
            variant={'outline'}
            colorScheme={'white'}
            color={'#003366'}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{
              _hover: {
                bg: '#003366', // Inverted background color on hover
                color: 'white', // Inverted text color on hover
              },
            }}
          >
            {isSubmitting ? 'Loading' : 'Register'}
          </Button>
        </Box>
      </Container>
    </div>

  );
};

export default RegistrationPage;
