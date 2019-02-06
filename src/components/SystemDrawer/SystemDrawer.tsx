import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';

import { Color } from '../../styles';
import { DirectionalPosition, Orientation } from '../../types/commons';

import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';
import SvgIcon from '../SvgIcon';
import SvgIconWithExtension from '../SvgIconWithExtension';
import { SvgIconWrapper, ToggleIcon, ToggleIconWrapper, Wrapper } from './SystemDrawer.css';

interface SystemDrawerIcon {
  cta: () => void;
  hasExtendedWindow: boolean;
  icon: string;
  isShownByDefault: boolean;
  title: string;
}

export interface Props {
  activeIcons: {
    [key: string]: boolean;
  };
  className?: string;
  extendedWindowPosition: DirectionalPosition;
  icons: SystemDrawerIcon[];
  isExpanded: boolean;
  launcherSizeConfig: LauncherSizeConfig;
  onClickToggle: (isExpanded?: boolean) => void;
  orientation: Orientation;
  size: number;
}

const defaultProps = { activeIcons: {} };

class SystemDrawer extends React.Component<Props> {
  static defaultProps = defaultProps;

  lastConfig: LauncherSizeConfig;
  lastOrientation: Orientation;

  constructor(props: Props) {
    super(props);

    this.lastConfig = props.launcherSizeConfig;
    this.lastOrientation = props.orientation;
  }

  handleCta = (cta: () => void, hasExtendedWindow: boolean) => {
    if (hasExtendedWindow) {
      return cta;
    }

    return () => {
      cta();
      this.props.onClickToggle(false);
    };
  };

  render() {
    const { activeIcons, className, extendedWindowPosition, icons, isExpanded, launcherSizeConfig, onClickToggle, orientation, size } = this.props;

    let hiddenIconCount = icons.reduce((acc, icon) => (!icon.isShownByDefault ? acc + 1 : acc), 0);

    // Do not allow animations/transitions to happen when switch orientation
    const stopTransition = this.lastConfig !== this.props.launcherSizeConfig || this.lastOrientation !== this.props.orientation;
    this.lastConfig = this.props.launcherSizeConfig;
    this.lastOrientation = this.props.orientation;

    return (
      <Wrapper
        className={className}
        sizingConfig={launcherSizeConfig}
        isExpanded={isExpanded}
        orientation={orientation}
        size={size}
        stopTransition={stopTransition}
      >
        <ToggleIconWrapper sizingConfig={launcherSizeConfig} isExpanded={isExpanded} orientation={orientation}>
          <ToggleIcon
            color={isExpanded ? Color.MARS : undefined}
            imgSrc={isExpanded ? closeIcon : arrowIcon}
            onClick={onClickToggle}
            orientation={orientation}
            size={isExpanded ? launcherSizeConfig.systemDrawerToggleClose : launcherSizeConfig.systemDrawerToggleOpen}
          />
        </ToggleIconWrapper>

        {icons.map(({ isShownByDefault, cta, hasExtendedWindow, icon, title }) => {
          const isVisible = isShownByDefault || isExpanded;
          const delayMultiplier = isShownByDefault ? 0 : hiddenIconCount;
          const handleClick = this.handleCta(cta, hasExtendedWindow);

          if (!isShownByDefault) {
            hiddenIconCount = hiddenIconCount - 1;
          }

          return (
            <SvgIconWrapper
              delayMultiplier={delayMultiplier}
              sizingConfig={launcherSizeConfig}
              isExpanded={isExpanded}
              isVisible={isVisible}
              key={title}
              orientation={orientation}
            >
              {hasExtendedWindow ? (
                <SvgIconWithExtension
                  caretSize={launcherSizeConfig.systemIconCaret}
                  disabled={!isVisible}
                  extensionPosition={extendedWindowPosition}
                  imgSrc={icon}
                  isActive={activeIcons[title]}
                  onClick={handleClick}
                  size={launcherSizeConfig.systemIcon}
                  title={title}
                />
              ) : (
                <SvgIcon
                  disabled={!isVisible}
                  imgSrc={icon}
                  isActive={activeIcons[title]}
                  onClick={handleClick}
                  size={launcherSizeConfig.systemIcon}
                  title={title}
                />
              )}
            </SvgIconWrapper>
          );
        })}
      </Wrapper>
    );
  }
}

export default SystemDrawer;
