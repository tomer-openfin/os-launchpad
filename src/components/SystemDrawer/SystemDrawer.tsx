import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';

import { Color } from '../../styles';
import { AppIconSizes, DirectionalPosition, Orientation } from '../../types/commons';
import { calcSystemDrawerToggleSize } from './utils';

import SvgIcon from '../SvgIcon';
import SvgIconWithExtension from '../SvgIconWithExtension';
import { SvgIconWrapper, ToggleIcon, ToggleIconWrapper, Wrapper } from './SystemDrawer.css';

interface SystemDrawerIcon {
  cta: () => void;
  hasExtendedWindow: boolean;
  icon: string;
  isShownByDefault: boolean;
  key: string;
}

interface Props {
  className?: string;
  extendedWindowPosition: DirectionalPosition;
  icons: SystemDrawerIcon[];
  iconSize?: AppIconSizes;
  isExpanded: boolean;
  onClickToggle: () => void;
  orientation: Orientation;
  size: number;
}

class SystemDrawer extends React.Component<Props> {
  lastOrientation: Orientation;

  constructor(props: Props) {
    super(props);

    this.lastOrientation = props.orientation;
  }

  render() {
    const { className, extendedWindowPosition, icons, iconSize, isExpanded, onClickToggle, orientation, size } = this.props;
    let hiddenIconCount = icons.reduce((acc, icon) => (!icon.isShownByDefault ? acc + 1 : acc), 0);
    // Do not allow animations/transitions to happen when switch orientation
    const stopTransition = this.lastOrientation !== this.props.orientation;
    this.lastOrientation = this.props.orientation;

    return (
      <Wrapper className={className} isExpanded={isExpanded} orientation={orientation} size={size} stopTransition={stopTransition}>
        <ToggleIconWrapper isExpanded={isExpanded} orientation={orientation}>
          <ToggleIcon
            color={isExpanded ? Color.MARS : undefined}
            imgSrc={isExpanded ? closeIcon : arrowIcon}
            onClick={onClickToggle}
            orientation={orientation}
            size={calcSystemDrawerToggleSize(isExpanded)}
          />
        </ToggleIconWrapper>

        {icons.map(({ isShownByDefault, cta, hasExtendedWindow, icon, key }) => {
          const isVisible = isShownByDefault || isExpanded;
          const delayMultiplier = isShownByDefault ? 0 : hiddenIconCount;
          if (!isShownByDefault) {
            hiddenIconCount = hiddenIconCount - 1;
          }

          return (
            <SvgIconWrapper delayMultiplier={delayMultiplier} isExpanded={isExpanded} isVisible={isVisible} key={key} orientation={orientation}>
              {hasExtendedWindow ? (
                <SvgIconWithExtension disabled={!isVisible} extensionPosition={extendedWindowPosition} imgSrc={icon} onClick={cta} size={iconSize} />
              ) : (
                <SvgIcon disabled={!isVisible} imgSrc={icon} onClick={cta} size={iconSize} />
              )}
            </SvgIconWrapper>
          );
        })}
      </Wrapper>
    );
  }
}

export default SystemDrawer;
