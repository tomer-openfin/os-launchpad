import { Application } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Login from './Login';

const mapDispatch = (dispatch: Dispatch) => ({
  closeApplication: () => dispatch(Application.close()),
});

export default connect(
  null,
  mapDispatch,
)(Login);
