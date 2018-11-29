import { connect } from 'react-redux';

import withFinBlur from '../../hocs/withFinBlur';
import { closeContextMenuRequest } from '../../redux/contextMenu';

const mapDispatch = dispatch => ({
  onBlur: () => dispatch(closeContextMenuRequest()),
});

export default Component =>
  connect(
    null,
    mapDispatch,
  )(withFinBlur(Component));
