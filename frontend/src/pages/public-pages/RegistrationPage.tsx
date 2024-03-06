import { FC }            from 'react';
import { Image }         from '@chakra-ui/react';


interface RegistrationPageProps {
  // Define your props here
}

const RegistrationPage: FC<RegistrationPageProps> = (props) => {
  return (
    <div style={{
      backgroundImage: `url(/registration.jpg)`,
      height: '100vh', // Set the height to 100% of the viewport height
      backgroundSize: 'cover', // Cover the entire div with the background image
      backgroundPosition: 'center' // Center the background image
    }}>


    </div>
  );
};

export default RegistrationPage;
