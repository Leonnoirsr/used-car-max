import { FC, useEffect, useState }                                  from 'react';
import axios                                                        from 'axios';
import { Box, Center, Container, Heading, SimpleGrid, Text, Image } from '@chakra-ui/react';

interface Report {
  id: string;
  year: number;
  make: string;
  model: string;
  type: string;
  mileage: number;
  price: number;
  imageUrl?: string;
}

const ReportsPage: FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:3001/api/reports/user-reports', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <Container maxW="container.xl" py="5">
      <Heading mb="6">Your Reports</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
        {reports.map((report) => (
          <Box key={report.id} p="5" shadow="md" borderWidth="1px" borderRadius="lg">
            <Heading fontSize="xl">{report.make} {report.model}</Heading>
            <Text mt="4">Year: {report.year}</Text>
            <Text>Type: {report.type}</Text>
            <Text>Mileage: {report.mileage.toLocaleString()} miles</Text>
            <Text>Price: ${report.price.toLocaleString()}</Text>
            {report.imageUrl && <Image src={report.imageUrl} alt="Car Image" mt="4" />}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ReportsPage;
