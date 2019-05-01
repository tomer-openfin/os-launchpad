import { connect } from 'react-redux';

import { getManifestImages } from '../../redux/application';
import { State } from '../../redux/types';
import { ManifestImageViewKeys } from '../../utils/orgImages';

import ComponentPreviewSplash from './ComponentPreviewSplash';

const mapState = (state: State) => ({
  imageSrc: getManifestImages(state)[ManifestImageViewKeys.splashscreen],
});

export default connect(
  mapState,
  null,
)(ComponentPreviewSplash);
