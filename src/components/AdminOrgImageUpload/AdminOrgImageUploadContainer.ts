import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { updateManifestOverrideRequest } from '../../redux/application';
import { saveOrgImage } from '../../redux/organization';

import { ROUTES } from '../Router/consts';

import { imageDisplayName, isManifestImageKey, OrgImageKey } from '../../utils/orgImages';

import { MetaWithCallbacks } from '../../types/commons';

import ImageUpload from '../ImageUpload';

const mapDispatch = dispatch => ({
  saveManifestImg: (payload, meta: MetaWithCallbacks) => dispatch(updateManifestOverrideRequest(payload, meta)),
  saveOrgImg: (payload, meta: MetaWithCallbacks) => dispatch(saveOrgImage(payload, meta)),
});

const mergeProps = (_, dispatchProps, ownProps: RouteComponentProps) => {
  const imageKey: OrgImageKey = ownProps.location.state;

  const { saveOrgImg, saveManifestImg } = dispatchProps;

  const returnToAdminSettings = () => ownProps.history.push(ROUTES.ADMIN_SETTINGS);

  const meta = { successCb: returnToAdminSettings, errorCb: returnToAdminSettings };

  const isManifestImage = isManifestImageKey(imageKey);

  return {
    handleCancel: returnToAdminSettings,
    headerText: `Upload new ${imageDisplayName(imageKey)} asset`,
    height: '326px',
    saveImage: (payload: string) => {
      if (isManifestImage) {
        saveManifestImg({ [imageKey]: payload }, meta);
      } else {
        saveOrgImg({ [imageKey]: payload }, meta);
      }
    },
    width: '420px',
    withoutFileUpload: !!isManifestImage,
  };
};

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(ImageUpload);
