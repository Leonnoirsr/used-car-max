import { FC }                              from 'react';
import { Box, Center, Container, Heading } from '@chakra-ui/react';

interface ReportsPageProps {

  // Define your props here

}

const ReportsPage: FC<ReportsPageProps> = (props) => {

  return (

    <div style={{ height: '100vh', }}>

      <Container>

        <Center>
          <Box mb={'5rem'} w={'sm'} bg="white">
            <Heading colorScheme={'facebook'} color={'#003366'}>
              Your Reports
            </Heading>
            <br />
          </Box>
        </Center>

      </Container>

    </div>
  );
};

export default ReportsPage;
