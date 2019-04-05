import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { App } from '../../types/commons';

import { saveOrgImage } from '../../redux/organization';

import { updateManifestOverride } from '../../redux/application';
import { isManifestImageKey, OrgImageKey } from '../../utils/orgImages';
import ConfirmRevertImage from './ConfirmRevertImage';

const mapDispatch = dispatch => ({
  saveManifestImg: (payload, meta) => dispatch(updateManifestOverride.request(payload, meta)),
  saveOrgImg: (payload, meta) => dispatch(saveOrgImage(payload, meta)),
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
    revertImage: (key: OrgImageKey, meta) => {
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
