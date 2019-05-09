import { connect } from 'react-redux';
import { matchPath, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ADMIN_WINDOW } from '../../config/windows';
import { getAdminApps, getAdminUsers } from '../../redux/admin';
import { getIsAdmin } from '../../redux/me/selectors';
import { getAdminOrgSettings } from '../../redux/organization';
import { State } from '../../redux/types';
import { hideWindow } from '../../redux/windows';
import { ADMIN_ROUTES } from '../Router/consts';
import { ADMIN_TABS, ADMIN_TABS_PATHS } from './utils';

import Admin, { Props } from './Admin';

interface MapState {
  isAdmin: boolean;
}

interface MapDispatch {
  fetchAdminApps: () => void;
  fetchAdminOrgSettings: () => void;
  fetchAdminUsers: () => void;
  hideWindow: () => void;
}

const mapState = (state: State) => ({
  isAdmin: getIsAdmin(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  fetchAdminApps: () => {
    dispatch(getAdminApps.request());
  },
  fetchAdminOrgSettings: () => {
    dispatch(getAdminOrgSettings.request());
  },
  fetchAdminUsers: () => {
    dispatch(getAdminUsers.request());
  },
  hideWindow: () => {
    dispatch(hideWindow.request({ name: ADMIN_WINDOW }));
  },
});

const mergeProps = (stateProps: MapState, dispatchProps: MapDispatch, ownProps: RouteComponentProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  activeTab: ADMIN_TABS_PATHS.find(path => !!matchPath(ownProps.location.pathname, { path, exact: ADMIN_TABS[path].exact })) || ADMIN_TABS_PATHS[0],
  onClickTab: (path: string) => {
    const { fetchAdminOrgSettings, fetchAdminApps, fetchAdminUsers } = dispatchProps;
    ownProps.history.push(path);

    // fetch assets for each tab onClick
    switch (path) {
      case ADMIN_ROUTES.ADMIN_SETTINGS:
        fetchAdminOrgSettings();
        break;
      case ADMIN_ROUTES.ADMIN_APPS:
        fetchAdminApps();
        break;
      case ADMIN_ROUTES.ADMIN_USERS:
        fetchAdminUsers();
        break;
      default:
        return;
    }
  },
});

export default connect<MapState, MapDispatch, RouteComponentProps, Props, State>(
  mapState,
  mapDispatch,
  mergeProps,
)(Admin);
