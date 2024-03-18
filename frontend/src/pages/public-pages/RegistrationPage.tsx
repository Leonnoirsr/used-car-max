import { FC }                                                                                                from 'react';
import { z }                                                                                                 from 'zod';
import { zodResolver }                                                                                       from '@hookform/resolvers/zod';
import { useNavigate }                                                                                       from 'react-router-dom';
import { SubmitHandler, useForm }                                                                            from 'react-hook-form';
import { Box, Button, Container, FormControl, FormLabel, FormErrorMessage, Heading, Input, FormHelperText, } from '@chakra-ui/react';
import axios                                                                                                 from 'axios';
import toast                                                                                                 from 'react-hot-toast';


interface RegistrationPageProps {

  // Define your props here

}

interface FormValues {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,

}

const RegistrationPage: FC<RegistrationPageProps> = (props) => {

  const navigate            = useNavigate(),

        schema              = z.object({

          firstName         : z.string().min(
            1,
            { message       : 'First Name Is Required' }
          ),

          lastName          : z.string().min(
            1,
            { message       : 'Last Name Is Required' }
          ),

          email             : z.string().email(
            { message       : 'Email is required' }).min(1,
              { message     : 'Email is required' }),

          password          : z.string().min(
            1,
            { message       : 'Password is required' }),

          confirmPassword   : z.string().min(
            1,
            { message       : 'Confirm Password is required' }),
        }).refine((data) => data.password === data.confirmPassword, {
          message           : 'Passwords do not match',
          path              : ['confirmPassword'],
        }),

        // -------------------------------------------------------------------

        { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
           mode                    : 'onBlur',
           resolver                : zodResolver(schema),
         });

        // ------------------------------------------------------------------

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {

      const parsedData    = schema.parse(data),

            response      = await axios.post('http://localhost:3001/api/auth/signup', parsedData);

      reset({ firstName   : '', lastName: '', email: '', password: '', confirmPassword: '' });

      toast.success('Account created successfully')

      navigate('/login');

      console.log(response.data);

    } catch (error) {

      if (axios.isAxiosError(error)) {

        const message = error.response?.data.message || 'An unknown error occured'

        toast.error('Failed to create account. ');

        console.table(`Account registration failed: ${message}`);

      }


    }
  };


  return (

    <div
      style={{
        height: '100vh',
      }}
    >
      <Container mt={'6rem'}>


        <Box mb={'5rem'} w={'sm'} bg="white">
          <Heading colorScheme={'facebook'} color={'#003366'}>
            Create an account
          </Heading>
          <br />
          <p>To continue create a Used CarMax Account</p>
        </Box>

        <Box>
          <FormControl id="firstName" isRequired isInvalid={errors.firstName && true}>
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <Input {...register('firstName')} id='firstName' type='text' />
            {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
          </FormControl>
        </Box>

        <Box>
          <FormControl id="lastName" isRequired isInvalid={errors.firstName && true}>
            <FormLabel htmlFor='lastName'>First Name</FormLabel>
            <Input {...register('lastName')} id='lastName' type='text' />
            {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
          </FormControl>
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
          <p style={{ marginTop: '5rem' }}>Already have an account? <a href={'/login'} style={{
            color: 'blue',
            textDecoration: 'underline',
          }}>Login</a></p>
        </Box>
      </Container>
    </div>

  );
};
export default RegistrationPage;
