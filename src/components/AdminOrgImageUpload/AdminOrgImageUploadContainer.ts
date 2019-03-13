import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { updateManifestOverrideRequest } from '../../redux/application';
import { saveOrgImage } from '../../redux/organization';

import { MetaWithCallbacks } from '../../types/commons';

import AdminOrgImageUpload from './AdminOrgImageUpload';

const mapDispatch = (dispatch, ownProps: RouteComponentProps) => ({
  imageKey: ownProps.location.state,
  pushRoute: (route: string): void => ownProps.history.push(route),
  saveManifestImg: (payload, meta: MetaWithCallbacks) => dispatch(updateManifestOverrideRequest(payload, meta)),
  saveOrgImg: (payload, meta: MetaWithCallbacks) => dispatch(saveOrgImage(payload, meta)),
});

export default connect(
  null,
  mapDispatch,
)(AdminOrgImageUpload);
