import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { APP_DIRECTORY_WINDOW } from '../../config/windows';
import { getAppsDirectoryAppList } from '../../redux/apps';

import withEscapeKey from '../../hocs/withEscapeKey';
import withFinBlur from '../../hocs/withFinBlur';
import AppDirectory from './AppDirectory';

const stateProps = state => ({
  appList: getAppsDirectoryAppList(state),
});

const dispatchProps = dispatch => ({
  onBlur: () => {
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  },
  onEscDown: () => {
    dispatch(Window.hideWindow({ id: APP_DIRECTORY_WINDOW }));
  },
});

export default connect(
  stateProps,
  dispatchProps,
)(withFinBlur(withEscapeKey(AppDirectory)));
