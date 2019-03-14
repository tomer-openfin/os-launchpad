import { connect } from 'react-redux';

import { State } from '../../redux/types';

import { getApplicationManifestOverride, getManifestImages } from '../../redux/application';
import { getOrganizationImages } from '../../redux/organization';

import { isManifestDefault } from '../../utils/manifestOverride';
import { ManifestImageViewKeys } from '../../utils/orgImages';
import OrganizationSettings from './OrganizationSettings';

const mapState = (state: State) => ({
  manifestImages: getManifestImages(state),
  manifestOverride: getApplicationManifestOverride(state),
  orgImages: getOrganizationImages(state),
});

const mergeProps = (stateProps, _, ownProps) => ({
  ...ownProps,
  ...stateProps,
  isManifestDefault: (imageKey: ManifestImageViewKeys) => isManifestDefault(stateProps.manifestOverride, imageKey),
});

export default connect(
  mapState,
  null,
  mergeProps,
)(OrganizationSettings);
