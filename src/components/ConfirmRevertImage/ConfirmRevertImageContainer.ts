import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { App, MetaWithCallbacks } from '../../types/commons';

import { saveOrgImage } from '../../redux/organization';

import { updateManifestOverrideRequest } from '../../redux/application/index';
import { isManifestImageKey, OrgImageKey } from '../../utils/orgImages';
import ConfirmRevertImage from './ConfirmRevertImage';

const mapDispatch = dispatch => ({
  saveManifestImg: (payload, meta: MetaWithCallbacks) => dispatch(updateManifestOverrideRequest(payload, meta)),
  saveOrgImg: (payload, meta: MetaWithCallbacks) => dispatch(saveOrgImage(payload, meta)),
});

const mergeProps = (_, dispatchProps, ownProps: RouteComponentProps) => {
  const imageKey: OrgImageKey = ownProps.location.state;

  const { saveOrgImg, saveManifestImg } = dispatchProps;

  const isManifestImage = isManifestImageKey(imageKey);

  return {
    ...dispatchProps,
    ...ownProps,
    imageKey,
    pushRoute: (route: string, item?: App): void => ownProps.history.push(route, item),
    revertImage: (key: OrgImageKey, meta: MetaWithCallbacks) => {
      if (isManifestImage) {
        saveManifestImg({ [key]: null }, meta);
      } else {
        saveOrgImg({ [key]: null }, meta);
      }
    },
  };
};

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(ConfirmRevertImage);
