import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import AppOverflow from './AppOverflow';

/* tslint:disable:no-console */
const dispatchProps = dispatch => {
  const listener = () => {
    console.log('BLUR', '\n');
    dispatch(Window.hideWindow({ id: APP_LAUNCHER_OVERFLOW_WINDOW }));
  };
  return {
    addHideOnBlurListener: () =>
      dispatch(
        Window.addWindowEventListener({ id: APP_LAUNCHER_OVERFLOW_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e)),
      ),
    removeHideOnBlurListener: () =>
      dispatch(
        Window.removeWindowEventListener({ id: APP_LAUNCHER_OVERFLOW_WINDOW, type: 'blurred', listener }, () => console.log('HERE'), e => console.error(e)),
      ),
  };
};

export default connect(
  null,
  dispatchProps,
)(AppOverflow);
