import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';
import * as layouts3Icon from '../../assets/Layouts3.svg';

import { Color } from '../../styles';
import { DirectionalPosition, Orientation } from '../../types/commons';
import { SystemIcon, WORKSPACES_KEY } from '../../utils/getSystemIcons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import { EventType, sendAnalytics } from '../../utils/analytics';
import SvgIcon from '../SvgIcon';
import SvgIconWithExtension from '../SvgIconWithExtension';
import { SvgIconWrapper, ToggleIcon, ToggleIconWrapper, Wrapper } from './SystemDrawer.css';

interface SystemDrawerIcon {
  color?: SystemIcon['color'];
  cta: () => void;
  hasExtendedWindow: boolean;
  hoverColor?: SystemIcon['hoverColor'];
  icon: SystemIcon['icon'];
  isBackground: boolean;
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
    const handleClickToggle = () => {
      sendAnalytics({ type: EventType.Click, label: 'SystemDrawerToggle', context: { currentlyExpanded: isExpanded } });
      onClickToggle();
    };
    const bottomOrRightMargin = launcherSizeConfig.minimizeToTrayIcon;

    return (
      <Wrapper
        bottomOrRightMargin={bottomOrRightMargin}
        className={className}
        orientation={orientation}
        size={size}
        sizingConfig={launcherSizeConfig}
        stopTransition={stopTransition}
      >
        <ToggleIconWrapper sizingConfig={launcherSizeConfig} isExpanded={isExpanded} orientation={orientation}>
          <ToggleIcon
            color={isExpanded ? Color.MARS : undefined}
            imgSrc={isExpanded ? closeIcon : arrowIcon}
            onClick={handleClickToggle}
            orientation={orientation}
            size={isExpanded ? launcherSizeConfig.systemDrawerToggleClose : launcherSizeConfig.systemDrawerToggleOpen}
          />
        </ToggleIconWrapper>

        {icons.map(({ isBackground, isShownByDefault, color, cta, hasExtendedWindow, hoverColor, icon, title }) => {
          const isVisible = isShownByDefault || isExpanded;
          const delayMultiplier = isShownByDefault ? 0 : hiddenIconCount;
          const handleClick = () => {
            sendAnalytics({ type: EventType.Click, label: 'SystemDrawerIcon', context: { title } });
            this.handleCta(cta, hasExtendedWindow)();
          };

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
                  color={color}
                  disabled={!isVisible}
                  extensionPosition={extendedWindowPosition}
                  hoverColor={hoverColor}
                  imgSrc={isExpanded && title === WORKSPACES_KEY ? layouts3Icon : icon}
                  isActive={activeIcons[title]}
                  isBackground={isBackground}
                  onClick={handleClick}
                  size={launcherSizeConfig.systemIcon}
                  title={title}
                />
              ) : (
                <SvgIcon
                  color={color}
                  disabled={!isVisible}
                  hoverColor={hoverColor}
                  imgSrc={icon}
                  isActive={activeIcons[title]}
                  isBackground={isBackground}
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
