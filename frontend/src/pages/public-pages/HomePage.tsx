import { FC }                               from 'react';
import { Container }         from '@chakra-ui/react';

interface HomePageProps {


  // Define your props here


}

const HomePage: FC<HomePageProps> = (props) => {


  return (


    <div
      style={{

      backgroundImage: `url(/home.jpg)`,
      height: '100vh', // Set the height to 100% of the viewport height
      backgroundSize: 'cover', // Cover the entire div with the background image
      backgroundPosition: 'center', // Center the background image

      }}>

      <Container>

      </Container>

    </div>


  );


};

export default HomePage;
