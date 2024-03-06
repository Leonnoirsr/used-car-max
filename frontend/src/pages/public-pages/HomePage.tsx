import { FC } from 'react';
import { Image } from '@chakra-ui/react';

interface HomePageProps {
  // Define your props here
}

const HomePage: FC<HomePageProps> = (props) => {
  return (
    <div>
      <Image src={'./home.jpg'} />
    </div>
  );
};

export default HomePage;
