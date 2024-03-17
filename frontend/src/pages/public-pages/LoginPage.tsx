import { FC } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

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




interface LoginPageProps {
  // Define your props here
}

interface FormValues {
  email: string,
  password: string,
}

const LoginPage: FC<LoginPageProps> = (props) => {

  const navigate = useNavigate();
  const schema = z.object({
    email: z.string().email({ message: 'Email is required' }).min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  })

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {

      const parsedData = schema.parse(data);

      const response = await axios.post('http://localhost:3001/api/auth/signin', parsedData);

      localStorage.setItem('authToken', response.data.token);

      toast.success('Login successful')

      navigate('/');

      reset({ email: '', password: '' });

    } catch (error) {

      if(axios.isAxiosError(error)) {

        const message = error.response?.data.message || 'An unknown error occured'

        toast.error( ' Login failed. ' + message);

        console.table(`Account login failed: ${message}`);
      }


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
            Welcome!
          </Heading>

          <br />

          <p>Sign in to access you Used CarMax account.</p>
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
            {isSubmitting ? 'Loading' : 'Sign In'}
          </Button>
          <p style={{ marginTop: '5rem' }}>Don't have Used CarMax Account? <a href={'/register'} style={{
            color: 'blue',
            textDecoration: 'underline',
          }}>Register</a></p>
        </Box>
      </Container>
    </div>

  );
};

export default LoginPage;
