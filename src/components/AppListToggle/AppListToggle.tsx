import * as React from 'react';
import { AppIconSizes } from '../../types/enums';

import * as Close from '../../assets/Close.svg';
import * as Ellipsis from '../../assets/Ellipsis.svg';

import SvgIcon from '../SvgIcon/SvgIcon';
import { SvgWrapper, Wrapper } from './AppListToggle.css';

export interface Props {
  backgroundColor?: string;
  className?: string;
  hasTransition?: boolean;
  isDisabled?: boolean;
  isExpanded?: boolean;
  margin?: string;
  onClick: () => void;
  size?: AppIconSizes;
}

const AppListToggle = ({
  backgroundColor,
  className,
  hasTransition = false,
  isDisabled = false,
  isExpanded = false,
  margin = '0',
  onClick,
  size = AppIconSizes.Medium,
}: Props) => (
  <Wrapper
    backgroundColor={backgroundColor}
    hasTransition={hasTransition}
    className={className}
    isDisabled={isDisabled}
    margin={margin}
    onClick={isDisabled ? undefined : onClick}
    size={size}
  >
    <SvgWrapper size={size}>
      <SvgIcon imgSrc={isExpanded ? Close : Ellipsis} size={25} />
    </SvgWrapper>
  </Wrapper>
);

export default AppListToggle;
