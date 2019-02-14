import { connect } from 'react-redux';

import { getMeEmail, getMeName } from '../../redux/me';
import { State } from '../../redux/types';

import AccountSettings from './AccountSettings';

const mapState = (state: State) => ({
  email: getMeEmail(state),
  name: getMeName(state),
});

export default connect(mapState)(AccountSettings);
