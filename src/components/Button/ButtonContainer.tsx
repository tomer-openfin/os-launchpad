import { connect } from 'react-redux';

import Button from './Button';

import windowConfig from '../../config/windows';
import { launchWindow } from '../../redux/windows/actions';

const mapDispatch = dispatch => ({
  onClick: () => dispatch(launchWindow(windowConfig.login)),
});

export default connect(null, mapDispatch)(Button);
