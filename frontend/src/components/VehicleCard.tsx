import { FC }                                                                                   from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Container, Stack, StackDivider, Box } from '@chakra-ui/react'

interface VehicleCardProps {
  year: string,
  make: string,
  model: string,
  type: string,
  mileage: number,
  price: number,
  owner: string

}

const VehicleCard: FC<VehicleCardProps> = (props) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Container>
            <Heading size={'md'}>{props.year}</Heading>
            <Heading size={'sm'}>{props.make}</Heading>
            <Heading size={'sm'}>{props.model}</Heading>

            {props.type}
          </Container>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing={'4'}>
            <Box>
              <Heading size={'xs'} textTransform={'uppercase'}>
                {props.owner}
              </Heading>
            </Box>
          </Stack>
          {props.mileage}
          {props.price}

        </CardBody>
      </Card>

    </>
  );
};

export default VehicleCard;
