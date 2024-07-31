import { FC }                                                                                                       from 'react';
import { Box, Container, Heading, Center }                                                                          from '@chakra-ui/react';



interface SignOutPageProps {}



const SignOutPage: FC<SignOutPageProps> = (props) => {



  return (

    <div style={{ height: '100vh', }}>

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
