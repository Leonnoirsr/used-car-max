import { FC, useEffect, useState }                                      from 'react';
import axios                                                            from 'axios';
import { Box, Container, Heading, SimpleGrid, Text, Image, IconButton } from '@chakra-ui/react';
import { DeleteIcon }                                                   from '@chakra-ui/icons';

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
    fetchReports();
  }, []);

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

  const deleteReport = async (id: string) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:3001/api/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchReports(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (

    reports.length > 0
      ? <Container maxW="container.xl" py="5">
        <Heading mb="6" colorScheme={'facebook'} color={'#003366'}>Your Reports</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
          {reports.map((report) => (
            <Box key={report.id} p="5" shadow="md" borderWidth="1px" borderRadius="lg" position="relative">
              <IconButton
                aria-label="Delete report"
                icon={<DeleteIcon />}
                background='transparent'
                _hover={{ bg: 'transparent' }}
                size="sm"
                position="absolute"
                top="1"
                right="1"
                onClick={() => deleteReport(report.id)}
              />
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

      : <Container maxW='container.xl' py='5'>
          <Heading mb="6" colorScheme={'facebook'} color={'#003366'}>Your Reports</Heading>
          <Text fontSize='md'>You Currently Have No Reports.</Text>
        </Container>

  );
};

export default ReportsPage;
