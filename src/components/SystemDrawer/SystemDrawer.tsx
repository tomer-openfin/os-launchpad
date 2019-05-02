import * as React from 'react';

import * as layouts3Icon from '../../assets/Layouts3.svg';

import { DirectionalPosition, Orientation } from '../../types/commons';
import { SystemIcon, WORKSPACES_KEY } from '../../utils/getSystemIcons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import { EventType, sendAnalytics } from '../../utils/analytics';
import SvgIcon from '../SvgIcon';
import SvgIconWithExtension from '../SvgIconWithExtension';
import { SvgIconWrapper, Wrapper } from './SystemDrawer.css';

interface SystemDrawerIcon {
  color?: SystemIcon['color'];
  cta: () => void;
  hasExtendedWindow: boolean;
  hoverColor?: SystemIcon['hoverColor'];
  icon: SystemIcon['icon'];
  isBackground: boolean;
  title: string;
}

export interface Props {
  activeIcons: {
    [key: string]: boolean;
  };
  className?: string;
  extendedWindowPosition: DirectionalPosition;
  icons: SystemDrawerIcon[];
  launcherSizeConfig: LauncherSizeConfig;
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

  render() {
    const { activeIcons, className, extendedWindowPosition, icons, launcherSizeConfig, orientation, size } = this.props;
    const bottomOrRightMargin = launcherSizeConfig.minimizeToTrayIcon;

    return (
      <Wrapper bottomOrRightMargin={bottomOrRightMargin} className={className} orientation={orientation} size={size} sizingConfig={launcherSizeConfig}>
        {icons.map(({ isBackground, color, cta, hasExtendedWindow, hoverColor, icon, title }) => {
          const handleClick = () => {
            sendAnalytics({ type: EventType.Click, label: 'SystemDrawerIcon', context: { title } });
            cta();
          };

          return (
            <SvgIconWrapper sizingConfig={launcherSizeConfig} key={title} orientation={orientation}>
              {hasExtendedWindow ? (
                <SvgIconWithExtension
                  caretSize={launcherSizeConfig.systemIconCaret}
                  color={color}
                  extensionPosition={extendedWindowPosition}
                  hoverColor={hoverColor}
                  imgSrc={icon}
                  isActive={activeIcons[title]}
                  isBackground={isBackground}
                  onClick={handleClick}
                  size={launcherSizeConfig.systemIcon}
                  title={title}
                />
              ) : (
                <SvgIcon
                  color={color}
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
