import { connect } from 'react-redux';

import { getManifestImages, getManifestShortcutName } from '../../redux/application';
import { State } from '../../redux/types';
import { ManifestImageViewKeys } from '../../utils/orgImages';

import ComponentPreviewShortcut from './ComponentPreviewShortcut';

const mapState = (state: State) => ({
  imageSrc: getManifestImages(state)[ManifestImageViewKeys.shortcut],
  shortcutName: getManifestShortcutName(state),
});

export default connect(
  mapState,
  null,
)(ComponentPreviewShortcut);
