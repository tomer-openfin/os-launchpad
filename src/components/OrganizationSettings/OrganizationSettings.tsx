import * as React from 'react';

import * as EyeIcon from '../../assets/Eye.svg';
import { OrgImages } from '../../redux/organization';

import { PreviewType } from '../../redux/admin/types';
import noop from '../../utils/noop';
import {
  DEFAULT_LOGIN_LOGO,
  DEFAULT_LOGO,
  imageDisplayName,
  imageMetaInfo,
  ImagesFromManifest,
  isManifestImageKey,
  ManifestImageViewKeys,
  orgImageData,
  OrgImageKey,
} from '../../utils/orgImages';
import { ROUTES } from '../Router/consts';
import { DeleteIconLink, EditIconLink, Header, Row, Wrapper } from './OrganizationSettings.css';

import Color from '../../styles/color';
import ImageCard from '../ImageCard';
import Modal from '../Modal';
import SvgIcon from '../SvgIcon/index';

export interface Props {
  handleCloseModal: () => void;
  togglePreview: (previewType: PreviewType) => () => void;
  isManifestDefault: (imageKey: ManifestImageViewKeys, imgSrc: string) => boolean;
  isModalVisible?: boolean;
  manifestImages: ImagesFromManifest;
  orgImages: { [key in keyof OrgImages]: string };
}

const defaultProps: Props = {
  handleCloseModal: () => noop,
  isManifestDefault: () => true,
  manifestImages: {
    [ManifestImageViewKeys.shortcut]: DEFAULT_LOGO,
    [ManifestImageViewKeys.splashscreen]: DEFAULT_LOGO,
  },
  orgImages: {
    loginLogo: DEFAULT_LOGIN_LOGO,
    logo: DEFAULT_LOGO,
  },
  togglePreview: () => () => noop,
};

const withDisabledClick = (disabled: boolean) => e => {
  if (disabled) e.preventDefault();
};

class OrganizationSettings extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  imageNameToPreviewType = {
    loginLogo: PreviewType.Login,
    shortcutIcon: PreviewType.Shortcut,
    splashScreenImage: PreviewType.Splash,
  };

  isDefaultImage = (imageKey: OrgImageKey, imgSrc: string) => {
    const isManifestImage = isManifestImageKey(imageKey);

    if (isManifestImage) {
      return this.props.isManifestDefault(imageKey as ManifestImageViewKeys, imgSrc);
    } else {
      return imgSrc === defaultProps.orgImages[imageKey];
    }
  };

  renderImageCtas = (imageKey: OrgImageKey, deleteDisabled) => {
    const { togglePreview } = this.props;
    return (
      <>
        {this.imageNameToPreviewType[imageKey] && (
          <SvgIcon
            disabled={false}
            color={Color.MERCURY}
            hoverColor={Color.JUPITER}
            imgSrc={EyeIcon}
            onClick={togglePreview(this.imageNameToPreviewType[imageKey])}
            size={30}
          />
        )}

        <EditIconLink to={{ pathname: ROUTES.ADMIN_SETTINGS_EDIT, state: imageKey }} />

        <DeleteIconLink
          to={{ pathname: ROUTES.ADMIN_SETTINGS_DELETE, state: imageKey }}
          onClick={withDisabledClick(deleteDisabled)}
          disabled={deleteDisabled}
        />
      </>
    );
  };

  render() {
    const { children, handleCloseModal, isModalVisible, orgImages, manifestImages } = this.props;

    const images = { ...orgImages, ...manifestImages };

    // User orgImageData here to ensure the ordering of cards is per design
    const imageKeys = Object.keys(orgImageData) as OrgImageKey[];

    return (
      <Wrapper>
        <Header>Enterprise Branding</Header>

        {imageKeys.map(imageKey => {
          const imgSrc = images[imageKey];

          const defaultImage = this.isDefaultImage(imageKey, imgSrc);

          return (
            <Row key={imageKey}>
              <ImageCard
                defaultImage={defaultImage}
                title={imageDisplayName(imageKey)}
                meta={imageMetaInfo(imageKey)}
                imgSrc={imgSrc}
                ctas={this.renderImageCtas(imageKey, defaultImage)}
              />
            </Row>
          );
        })}

        {isModalVisible && <Modal handleClose={handleCloseModal}>{children}</Modal>}
      </Wrapper>
    );
  }
}

export default OrganizationSettings;
