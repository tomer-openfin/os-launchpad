import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { toggleAppIsShowing } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig } from '../../redux/me';
import { State } from '../../redux/types';
import SendToSystemTray from './SendToSystemTray';

const mapState = (state: State) => {
  const launcherConfig = getLauncherSizeConfig(state);

  return {
    launcherPosition: getLauncherPosition(state),
    size: launcherConfig.minimizeToTrayIcon,
  };
};

const mapDispatch = (dispatch: Dispatch) => ({
  handleClick: () => dispatch(toggleAppIsShowing()),
});

export default connect(
  mapState,
  mapDispatch,
)(SendToSystemTray);
