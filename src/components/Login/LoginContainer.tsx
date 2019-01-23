import { Application } from '@giantmachines/redux-openfin';
import { connect } from 'react-redux';

import { getMeLoginState, loginRequest, LoginRequestPayload, loginWithNewPassword, LoginWithNewPasswordPayload } from '../../redux/me';
import { getOrganizationAutoLogin } from '../../redux/organization';

import Login from './Login';

const mapState = state => ({
  autoLoginOrg: getOrganizationAutoLogin(state),
  loginState: getMeLoginState(state),
});

const mapDispatch = dispatch => ({
  closeApplication: () => dispatch(Application.close()),
  login: (options: LoginRequestPayload) => dispatch(loginRequest(options)),
  loginWithNewPassword: (options: LoginWithNewPasswordPayload) => dispatch(loginWithNewPassword(options)),
});

export default connect(
  mapState,
  mapDispatch,
)(Login);
