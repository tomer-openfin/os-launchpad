import { connect } from 'react-redux';

import { getOrganizationImages, OrgImages } from '../../redux/organization';
import { State } from '../../redux/types';

import Logo, { Props } from './Logo';

interface ContainerProps {
  orgImageKey?: keyof OrgImages;
}

interface MapState {
  imgSrc: string;
}

const mapState = (state: State, props: ContainerProps): MapState => {
  const orgImages: { [key in keyof OrgImages]: string } = getOrganizationImages(state);

  return {
    imgSrc: orgImages[props.orgImageKey || 'logo'],
  };
};

export default connect<MapState, null, ContainerProps, State>(mapState)(Logo);
