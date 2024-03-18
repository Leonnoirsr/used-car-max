import { FC }           from 'react';
import { Image }        from '@chakra-ui/react';

interface LogoProps {

  image: {
    src: string,
    alt: string
  };

}

const Logo: FC<LogoProps> = (props: LogoProps) => {


  return (
    <Image src={props.image.src} alt={props.image.alt} boxSize={'7rem'} objectFit={'cover'} />
  );


};

export default Logo;
