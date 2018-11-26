import { connect } from 'react-redux';

import { getOrganizationLogo, setLogo } from '../../redux/organization';
import LogoForm from './LogoForm';

const mapState = state => ({
  logo: getOrganizationLogo(state),
});

const mapDispatch = {
  setLogo,
};

export default connect(
  mapState,
  mapDispatch,
)(LogoForm);
