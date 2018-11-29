import { Window } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../../config/windows';
import withFinBlur from '../../hocs/withFinBlur';
import AppOverflow from './AppOverflow';

const dispatchProps = dispatch => ({
  onBlur: () => dispatch(Window.hideWindow({ id: APP_LAUNCHER_OVERFLOW_WINDOW })),
});

export default connect(
  null,
  dispatchProps,
)(withFinBlur(AppOverflow));
