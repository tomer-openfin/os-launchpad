import * as React from 'react';

import * as EmptyLogo from '../../assets/empty-logo.svg';

import IconSpace from '../IconSpace';

interface Props {
  large?: boolean;
  logo: string;
}

const Logo = ({ large, logo }: Props) => {
  if (large) {
    return (
      <IconSpace large={large} backgroundImg={logo || EmptyLogo} />
    );
  }

  return <IconSpace iconImg={logo || EmptyLogo} />;
};

export default Logo;
