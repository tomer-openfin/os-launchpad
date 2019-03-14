import { connect } from 'react-redux';
import { matchPath, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ADMIN_WINDOW } from '../../config/windows';
import { getIsAdmin } from '../../redux/me/selectors';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';

import Admin, { Props } from './Admin';
import { ADMIN_TABS, ADMIN_TABS_PATHS } from './utils';

interface MapState {
  isAdmin: boolean;
}

interface MapDispatch {
  hideWindow: () => void;
}

const mapState = (state: State) => ({
  isAdmin: getIsAdmin(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  hideWindow: () => {
    dispatch(hideWindow({ name: ADMIN_WINDOW }));
  },
});

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch, ownProps: RouteComponentProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  activeTab: ADMIN_TABS_PATHS.find(path => !!matchPath(ownProps.location.pathname, { path, exact: ADMIN_TABS[path].exact })) || ADMIN_TABS_PATHS[0],
  onClickTab: (path: string) => ownProps.history.push(path),
});

export default connect<MapState, MapDispatch, RouteComponentProps, Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(Admin);
