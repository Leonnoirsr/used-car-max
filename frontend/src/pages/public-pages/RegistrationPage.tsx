import { FC } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Container, FormControl, FormLabel, Image, Input } from '@chakra-ui/react';


interface RegistrationPageProps {
  // Define your props here
}

interface FormValues {
  email: string,
  password: string,
}

const RegistrationPage: FC<RegistrationPageProps> = (props) => {


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <div style={{
      backgroundImage: `url(/registration.jpg)`,
      height: '100vh', // Set the height to 100% of the viewport height
      backgroundSize: 'cover', // Cover the entire div with the background image
      backgroundPosition: 'center', // Center the background image
    }}>
      <Container>
        <Box
          p="6"
          m="4"
          w={'lg'}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <FormControl id="email" isRequired>
            <FormLabel htmlFor={'email'}>Email</FormLabel>
            <Input {...register('email')} id="email" type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel htmlFor={'password'}>Password</FormLabel>
            <Input {...register('password')} id={'password'} type="password" />
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel htmlFor={'confirmPassword'}>Confirm Password</FormLabel>
            <Input {...register('password')} id={'confirmPassword'} type="password" />
          </FormControl>
          <Button disabled={isSubmitting} colorScheme="blue" type="submit" mt="4" onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading' : 'Submit'}
          </Button>
        </Box>
      </Container>
    </div>

  );
};

export default RegistrationPage;
