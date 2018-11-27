import { connect } from 'react-redux';

import { loginRequest, LoginRequestPayload } from '../../redux/me';

import Login from './Login';

const mapState = state => ({
  loginError: state.me.loginError,
});

const mapDispatch = dispatch => ({
  onSubmit: (options: LoginRequestPayload) => dispatch(loginRequest(options)),
});

export default connect(mapState, mapDispatch)(Login);
