import * as React from 'react';

import throttle from 'lodash-es/throttle';

import * as adminIcon from '../../assets/AdminSettings.svg';
import * as logoIcon from '../../assets/Logo.svg';
import * as notificationsIcon from '../../assets/Notifications.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';
import * as searchIcon from '../../assets/Search.svg';
import * as settingsIcon from '../../assets/Settings.svg';

import windowsConfig from '../../config/windows';
import { Bounds } from '../../redux/types';
import { WindowConfig } from '../../redux/windows/types';
import { isPosInBounds } from '../../utils/coordinateHelpers';

import AppList from '../AppList';
import IconSpace from '../IconSpace';
import { EllipsisImage, EllipsisWrapper, Separator, Wrapper } from './App.css';

interface Props {
  autoHide: boolean;
  bounds: Bounds;
  collapseApp: () => void;
  expandApp: () => void;
  isExpanded: boolean;
  launcherPosition: string;
  launchWindow: (window: WindowConfig) => void;
  monitorInfo: object;
  setMonitorInfo: (monitorInfo: object) => void;
  saveCurrentLayout: Function;
  restoreCurrentLayout: Function;
}

// TODO - move to an HOC
class App extends React.PureComponent<Props> {
  interval?: number;

  constructor(props: Props) {
    super(props);

    this.handleMouseEnterOnWindow = throttle(this.handleMouseEnterOnWindow.bind(this), 225, { leading: true, trailing: false });
    this.handleMouseLeaveOnWindow = throttle(this.handleMouseLeaveOnWindow.bind(this), 225, { leading: true, trailing: false });
  }

  componentDidMount() {
    this.bindMouseEvents();
  }

  componentWillUnmount() {
    this.unbindMouseEvents();
  }

  bindMouseEvents = () => {
    this.interval = window.setInterval(this.handleInterval, 250);
    window.addEventListener('mouseover', this.handleMouseEnterOnWindow);
  };

  unbindMouseEvents = () => {
    this.clearInterval();
    window.removeEventListener('mouseover', this.handleMouseEnterOnWindow);
  };

  clearInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  handleInterval = () => {
    const { fin } = window;
    const { bounds, isExpanded } = this.props;

    if (!fin || !isExpanded) {
      return;
    }

    fin.desktop.System.getMousePosition(pos => {
      if (!isPosInBounds(pos, bounds)) {
        this.handleMouseLeaveOnWindow();
      }
    });
  };

  handleMouseEnterOnWindow() {
    if (!this.props.autoHide) {
      return;
    }

    if (!this.props.isExpanded) {
      this.props.expandApp();
    }
  }

  handleMouseLeaveOnWindow() {
    if (!this.props.autoHide) {
      return;
    }

    if (this.props.isExpanded) {
      this.props.collapseApp();
    }
  }

  handleSaveCurrentLayout = () => this.props.saveCurrentLayout();
  handleRestoreCurrentLayout = () => this.props.restoreCurrentLayout();

  handleLaunchAdminWindow = () => this.props.launchWindow(windowsConfig.admin);
  handleLaunchAppDirectoryWindow = () => this.props.launchWindow(windowsConfig.appDirectory);
  handleLaunchAppOverflowWindow = () => this.props.launchWindow(windowsConfig.appLauncherOverflow);
  handleLaunchSettingsWindow = () => this.props.launchWindow(windowsConfig.settings);
  handleLaunchLayoutsWindow = () => this.props.launchWindow(windowsConfig.layouts);

  render() {
    const { launcherPosition } = this.props;

    return (
      <Wrapper launcherPosition={launcherPosition}>
        <IconSpace iconImg={logoIcon} />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={searchIcon} onClick={this.handleLaunchAppDirectoryWindow} hover />

        <Separator launcherPosition={launcherPosition} />

        <AppList spaceCount={4} />

        <EllipsisWrapper onClick={this.handleLaunchAppOverflowWindow} launcherPosition={launcherPosition}>
          <EllipsisImage launcherPosition={launcherPosition} />
        </EllipsisWrapper>

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={adminIcon} onClick={this.handleLaunchAdminWindow} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={settingsIcon} onClick={this.handleLaunchSettingsWindow} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={saveLayoutIcon} onClick={this.handleLaunchLayoutsWindow} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={notificationsIcon} hover />
      </Wrapper>
    );
  }
}

export default App;
