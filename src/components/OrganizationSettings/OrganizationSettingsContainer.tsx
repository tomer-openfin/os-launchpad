import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../redux/types';

import { getApplicationManifestOverride, getManifestImages } from '../../redux/application';
import { getOrganizationImages } from '../../redux/organization';
import { isManifestDefault } from '../../utils/manifestOverride';
import { ManifestImageViewKeys } from '../../utils/orgImages';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ADMIN_SETTINGS_ROUTES } from '../Router/consts';

import { clickComponentPreview, PreviewType } from '../../redux/admin';
import OrganizationSettings from './OrganizationSettings';

const ADMIN_SETTINGS_PATHS = Object.values(ADMIN_SETTINGS_ROUTES);

const mapState = (state: State) => ({
  manifestImages: getManifestImages(state),
  manifestOverride: getApplicationManifestOverride(state),
  orgImages: getOrganizationImages(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  togglePreview: (previewType: PreviewType) => () => {
    dispatch(clickComponentPreview(previewType));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  children: ownProps.children,
  handleCloseModal: ownProps.history.goBack,
  isManifestDefault: (imageKey: ManifestImageViewKeys) => isManifestDefault(stateProps.manifestOverride, imageKey),
  isModalVisible: doesCurrentPathMatch(ADMIN_SETTINGS_PATHS, ownProps.location.pathname),
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps,
)(OrganizationSettings);
