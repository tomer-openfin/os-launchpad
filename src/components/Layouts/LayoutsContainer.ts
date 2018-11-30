import { connect } from 'react-redux';

import { Layout } from 'openfin-layouts/dist/client/types';
import { LAYOUTS_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import { restoreLayout, saveLayoutRequest } from '../../redux/layouts';
import { getLauncherPosition } from '../../redux/me';
import { State } from '../../redux/types';
import { blurWindowWithDelay } from '../../redux/windows/index';

import Layouts from './Layouts';

const mapState = (state: State) => ({
  launcherPosition: getLauncherPosition(state),
});

const mapDispatch = dispatch => ({
  onBlur: () => {
    dispatch(blurWindowWithDelay(LAYOUTS_WINDOW));
  },
  restoreCurrentLayout: () => dispatch(restoreLayout(JSON.parse(localStorage.layouts)[0] as Layout)),
  // force the generation of current layout on save by passing in undefined
  saveCurrentLayout: () => dispatch(saveLayoutRequest((undefined as unknown) as Layout)),
});

export default connect(
  mapState,
  mapDispatch,
)(withFinBlur(Layouts));
