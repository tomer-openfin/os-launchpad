import { connect } from 'react-redux';

import { getMeAuthIsError, getMeAuthMessage } from '../../redux/me';
import { State } from '../../redux/types';
import { closeApplication } from '../../utils/finUtils';

import Login from './Login';

const mapState = (state: State) => ({
  closeApplication: () => closeApplication()(),
  error: getMeAuthIsError(state),
  message: getMeAuthMessage(state),
});

export default connect(mapState)(Login);
