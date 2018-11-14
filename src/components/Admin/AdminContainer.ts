import { connect } from 'react-redux';

import { getIsAdmin } from '../../redux/me/selectors';

import Admin from './Admin';

const mapState = state => ({
  isAdmin: getIsAdmin(state),
});

export default connect(mapState)(Admin);
