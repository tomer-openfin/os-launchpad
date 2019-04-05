import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { ManifestOverride, updateManifestOverride } from '../../redux/application';
import { OrganizationState, saveOrgImage } from '../../redux/organization';

import { MetaWithAsyncHandlers } from '../../types/commons';

import AdminOrgImageUpload from './AdminOrgImageUpload';

const mapDispatch = (dispatch, ownProps: RouteComponentProps) => ({
  imageKey: ownProps.location.state,
  pushRoute: (route: string): void => ownProps.history.push(route),
  saveManifestImg: (payload: ManifestOverride, meta: MetaWithAsyncHandlers<ManifestOverride>) => dispatch(updateManifestOverride.request(payload, meta)),
  saveOrgImg: (payload, meta: MetaWithAsyncHandlers<OrganizationState>) => dispatch(saveOrgImage(payload, meta)),
});

export default connect(
  null,
  mapDispatch,
)(AdminOrgImageUpload);
