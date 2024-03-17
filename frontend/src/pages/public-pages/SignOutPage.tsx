import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  FormHelperText, Center,
} from '@chakra-ui/react';


interface SignOutPageProps {
  // Define your props here
}



const SignOutPage: FC<SignOutPageProps> = (props) => {

  const navigate = useNavigate();


  return (

    <div style={{
      height: '100vh',
    }}>
      <Container mt={'6rem'}>
        <Center>
          <Box mb={'5rem'} w={'sm'} bg="white">
            <Heading colorScheme={'facebook'} color={'#003366'}>
              See You Again Soon!
            </Heading>
          </Box>
        </Center>
      </Container>
    </div>

  );
};
export default SignOutPage;
