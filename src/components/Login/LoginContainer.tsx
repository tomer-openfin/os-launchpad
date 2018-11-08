import { connect } from 'react-redux';

import { loginRequest } from '../../redux/me';

import Login from './Login';

const mapState = state => ({
  loginError: state.me.loginError,
});

const mapDispatch = dispatch => ({
  onSubmit: (options: { email: string, password: string }) => dispatch(loginRequest(options)),
});

export default connect(mapState, mapDispatch)(Login);
