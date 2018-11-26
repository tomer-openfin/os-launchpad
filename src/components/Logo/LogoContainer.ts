import { connect } from 'react-redux';

import { getOrganizationLogo } from '../../redux/organization';
import { State } from '../../redux/types';

import Logo from './Logo';

const mapState = (state: State) => ({
  logo: getOrganizationLogo(state),
});

export default connect(mapState)(Logo);
