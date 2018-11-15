import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { Layout } from 'openfin-layouts/dist/client/types';
import { restoreLayout, saveLayoutRequest } from '../../redux/layouts';
import { getLauncherPosition } from '../../redux/me';
import { State } from '../../redux/types';

import Layouts from './Layouts';

const mapState = (state: State) => ({
  launcherPosition: getLauncherPosition(state),
});

/* tslint:disable:no-console */
const mapDispatch = dispatch => ({
  addWindowListener: (id, type, listener) => dispatch(Window.addWindowEventListener({ id, type, listener }, () => console.log('HERE'), e => console.error(e))),
  hideWindow: id => {
    console.log('BLUR', '\n');
    dispatch(Window.hideWindow({ id }));
  },
  removeWindowListener: (id, type, listener) =>
    dispatch(Window.removeWindowEventListener({ id, type, listener }, () => console.log('HERE'), e => console.error(e))),
  restoreCurrentLayout: () => dispatch(restoreLayout(JSON.parse(localStorage.layouts)[0] as Layout)),
  // force the generation of current layout on save by passing in undefined
  saveCurrentLayout: () => dispatch(saveLayoutRequest((undefined as unknown) as Layout)),
});

export default connect(
  mapState,
  mapDispatch,
)(Layouts);
