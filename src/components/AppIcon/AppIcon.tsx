import * as React from 'react';

import { AppIconSizes } from '../../types/commons';

import { Icon, Wrapper } from './AppIcon.css';

export interface Props {
  className?: string;
  imgSrc: string;
  isDisabled?: boolean;
  onClick?: () => void;
  size?: AppIconSizes;
}

const defaultProps = {
  isDisabled: false,
  size: AppIconSizes.Medium,
};

const AppIcon = (props: Props) => {
  const { className, isDisabled = defaultProps.isDisabled, onClick, size = defaultProps.size, imgSrc } = props;

  return (
    <Wrapper className={className} isDisabled={isDisabled} onClick={isDisabled ? undefined : onClick} size={size}>
      <Icon imgSrc={imgSrc} />
    </Wrapper>
  );
};

export default AppIcon;
