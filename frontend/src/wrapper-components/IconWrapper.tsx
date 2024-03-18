import React, { FC, ReactElement } from 'react';

interface IconWrapperProps {

  icon: ReactElement;
  size?: string | number;

}

const IconWrapper: FC<IconWrapperProps> = ({ icon, size = '1em' }) => {

  const Icon = React.cloneElement(icon, {
    size: size
  });

  return <>{Icon}</>;

};

export default IconWrapper;
