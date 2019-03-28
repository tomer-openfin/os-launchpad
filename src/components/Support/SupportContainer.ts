import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import windowsConfig from '../../config/windows';
import { hideWindow } from '../../redux/windows';
import Support from './Support';

const mapDispatch = (dispatch: Dispatch) => ({
  handleClose: () => dispatch(hideWindow({ name: windowsConfig.support.name })),
});

export default connect(
  null,
  mapDispatch,
)(Support);
