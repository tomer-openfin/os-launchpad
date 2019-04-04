import { Application } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getMeAuthIsError, getMeAuthMessage } from '../../redux/me/index';
import { State } from '../../redux/types';

import Login from './Login';

const mapState = (state: State) => ({ message: getMeAuthMessage(state), error: getMeAuthIsError(state) });

const mapDispatch = (dispatch: Dispatch) => ({
  closeApplication: () => dispatch(Application.close()),
});

export default connect(
  mapState,
  mapDispatch,
)(Login);
