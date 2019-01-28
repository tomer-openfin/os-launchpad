import * as React from 'react';
import { LauncherSize } from '../../types/enums';

import * as Close from '../../assets/Close.svg';
import * as Ellipsis from '../../assets/Ellipsis.svg';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import DragAndDrop, { Props as DragAndDropProps } from '../DragAndDrop';
import SvgIcon from '../SvgIcon/SvgIcon';
import { SvgWrapper, Wrapper } from './AppListToggle.css';

export interface Props {
  borderWidth?: number;
  className?: string;
  dragAndDropOptions?: DragAndDropProps;
  hasTransition?: boolean;
  isDisabled?: boolean;
  isDragAndDroppable?: boolean;
  isExpanded?: boolean;
  margin?: string;
  onClick: () => void;
  size?: number;
}

const defaultProps = {
  borderWidth: launcherSizeConfigs[LauncherSize.Large].appIconBorder,
  hasTransition: false,
  isDisabled: false,
  isDragAndDroppable: false,
  isExpanded: false,
  margin: '0',
  size: launcherSizeConfigs[LauncherSize.Large].appIcon,
};

export const AppListToggleId = 'osLaunchPadMain::app-list-toggle';

const renderAppListToggleContent = ({ borderWidth = defaultProps.borderWidth, isExpanded, size = defaultProps.size }: Props) => (
  <SvgWrapper borderWidth={borderWidth} size={size}>
    <SvgIcon imgSrc={isExpanded ? Close : Ellipsis} size={25} />
  </SvgWrapper>
);

const AppListToggle = (props: Props) => {
  const {
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
    <Wrapper hasTransition={hasTransition} className={className} isDisabled={isDisabled} margin={margin} onClick={isDisabled ? undefined : onClick} size={size}>
      {isDragAndDroppable && dragAndDropOptions ? (
        <DragAndDrop {...dragAndDropOptions}>{renderAppListToggleContent(props)}</DragAndDrop>
      ) : (
        renderAppListToggleContent(props)
      )}
    </Wrapper>
  );
};

export default AppListToggle;
