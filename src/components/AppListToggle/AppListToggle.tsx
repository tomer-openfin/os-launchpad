import * as React from 'react';
import { AppIconSizes } from '../../types/enums';

import * as Close from '../../assets/Close.svg';
import * as Ellipsis from '../../assets/Ellipsis.svg';

import DragAndDrop, { Props as DragAndDropProps } from '../DragAndDrop';
import SvgIcon from '../SvgIcon/SvgIcon';
import { SvgWrapper, Wrapper } from './AppListToggle.css';

export interface Props {
  backgroundColor?: string;
  className?: string;
  dragAndDropOptions?: DragAndDropProps;
  hasTransition?: boolean;
  isDisabled?: boolean;
  isDragAndDroppable?: boolean;
  isExpanded?: boolean;
  margin?: string;
  onClick: () => void;
  size?: AppIconSizes;
}

const defaultProps = {
  hasTransition: false,
  isDisabled: false,
  isDragAndDroppable: false,
  isExpanded: false,
  margin: '0',
  size: AppIconSizes.Medium,
};

export const AppListToggleId = 'osLaunchPadMain::app-list-toggle';

const renderAppListToggleContent = ({ isExpanded, size = defaultProps.size }: Props) => (
  <SvgWrapper size={size}>
    <SvgIcon imgSrc={isExpanded ? Close : Ellipsis} size={25} />
  </SvgWrapper>
);

const AppListToggle = (props: Props) => {
  const {
    backgroundColor,
    className,
    dragAndDropOptions,
    hasTransition = defaultProps.hasTransition,
    isDisabled = defaultProps.isDisabled,
    isDragAndDroppable = defaultProps.isDragAndDroppable,
    margin = '0',
    onClick,
    size = defaultProps.size,
  } = props;

  return (
    <Wrapper
      backgroundColor={backgroundColor}
      hasTransition={hasTransition}
      className={className}
      isDisabled={isDisabled}
      margin={margin}
      onClick={isDisabled ? undefined : onClick}
      size={size}
    >
      {isDragAndDroppable && dragAndDropOptions ? (
        <DragAndDrop {...dragAndDropOptions}>{renderAppListToggleContent(props)}</DragAndDrop>
      ) : (
        renderAppListToggleContent(props)
      )}
    </Wrapper>
  );
};

export default AppListToggle;
