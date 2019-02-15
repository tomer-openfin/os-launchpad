import { connect } from 'react-redux';

import { State } from '../../redux/types';

import { getManifest, getManifestImages } from '../../redux/application';
import { getOrganizationImages } from '../../redux/organization';

import { isManifestDefault } from '../../utils/manifestOverride';
import { ManifestImageViewKeys } from '../../utils/orgImages';
import OrganizationSettings from './OrganizationSettings';

const mapState = (state: State) => ({
  manifest: getManifest(state),
  manifestImages: getManifestImages(state),
  orgImages: getOrganizationImages(state),
});

const mergeProps = (stateProps, _, ownProps) => ({
  ...ownProps,
  ...stateProps,
  isManifestDefault: (imageKey: ManifestImageViewKeys, imgSrc: string) => isManifestDefault(stateProps.manifest, imageKey, imgSrc),
});

export default connect(
  mapState,
  null,
  mergeProps,
)(OrganizationSettings);
