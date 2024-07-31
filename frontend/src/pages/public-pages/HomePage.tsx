import { FC, useEffect, useState }                          from 'react';
import axios                                                from 'axios';
import { Box, Container, Heading, SimpleGrid, Text, Image } from '@chakra-ui/react';


interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Report {
  id: string;
  year: number;
  make: string;
  model: string;
  type: string;
  mileage: number;
  price: number;
  imageUrl?: string;
  userId: string;
  user?: User;
}

const HomePage: FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      fetchUsersAndReports(token);
    }
  }, []);

  const fetchUsersAndReports = async (token: string) => {
    try {
      const usersResponse = await axios.get('http://localhost:3001/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const reportsResponse = await axios.get('http://localhost:3001/api/reports/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const reportsWithUser = reportsResponse.data.map((report: Report) => {
        const user = usersResponse.data.find((user: User) => user.id === report.userId);
        return { ...report, user };
      });
      setReports(reportsWithUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(/home.jpg)`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {isAuthenticated && (
        <Container maxW="container.xl" position="absolute" top="50%" transform="translateY(-50%)" width="100%">
          <Heading mb="6" color="white">All Reports</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {reports.map((report) => (
              <Box key={report.id} p="5" shadow="md" borderWidth="1px" borderRadius="lg" bg="white" opacity="0.9">
                <Heading fontSize="xl">{report.make} {report.model}</Heading>
                <Text mt="4">Year: {report.year}</Text>
                <Text>Type: {report.type}</Text>
                <Text>Mileage: {report.mileage.toLocaleString()} miles</Text>
                <Text>Price: ${report.price.toLocaleString()}</Text>
                {report.user ? (
                  <Text>Owner: {report.user.firstName[0]}.{report.user.lastName}</Text>
                ) : (
                  <Text>Owner: Unknown</Text>
                )}
                {report.imageUrl && <Image src={report.imageUrl} alt="Car Image" mt="4" />}
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
