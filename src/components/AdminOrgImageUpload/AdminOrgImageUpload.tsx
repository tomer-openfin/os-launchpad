import * as React from 'react';

import { ROUTES } from '../Router/consts';

import { imageDisplayName, isManifestImageKey, OrgImageKey } from '../../utils/orgImages';

import { Manifest } from '../../redux/application/types';
import { OrgImages } from '../../redux/organization/types';
import { DispatchRequest, MetaWithCallbacks, PushRoute } from '../../types/commons';

import withResponseState, { PassedProps as ResponseProps } from '../../hocs/withResponseState';

import ImageUpload from '../ImageUpload';

interface Props extends ResponseProps {
  imageKey: OrgImageKey;
  pushRoute: PushRoute;
  saveManifestImg: DispatchRequest<Partial<Manifest>>;
  saveOrgImg: DispatchRequest<Partial<OrgImages>>;
}

class AdminOrgImageUpload extends React.Component<Props> {
  returnToAdminSettings = () => this.props.pushRoute(ROUTES.ADMIN_SETTINGS);

  saveImage = (payload: string) => {
    const { imageKey, saveManifestImg, saveOrgImg, onResponseSuccess, onResponseError } = this.props;

    const meta: MetaWithCallbacks = { successCb: onResponseSuccess(this.returnToAdminSettings), errorCb: onResponseError() };

    if (isManifestImageKey(imageKey)) {
      saveManifestImg({ [imageKey]: payload }, meta);
    } else {
      saveOrgImg({ [imageKey]: payload }, meta);
    }
  };

  render() {
    const { imageKey, responseError, responseMessage, resetResponseError } = this.props;

    return (
      <ImageUpload
        saveImage={this.saveImage}
        withoutFileUpload={!!isManifestImageKey(imageKey)}
        headerText={`Upload new ${imageDisplayName(imageKey)} asset`}
        handleCancel={this.returnToAdminSettings}
        height="326px"
        width="420px"
        responseError={responseError}
        responseMessage={responseMessage}
        resetResponseError={resetResponseError}
      />
    );
  }
}

export default withResponseState(AdminOrgImageUpload);
