import React, { FC, ReactElement } from 'react';

interface IconWrapperProps {
  icon: ReactElement;
  size?: string | number;
}

const IconWrapper: FC<IconWrapperProps> = ({ icon, size = '1em' }) => {
  // Clone the icon element with new props
  const Icon = React.cloneElement(icon, {
    size: size // For React Icons
  });

  return <>{Icon}</>;
};

export default IconWrapper;
