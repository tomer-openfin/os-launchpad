import { connect } from 'react-redux';

import { getOrganizationLogo, saveLogo, setLogo } from '../../redux/organization';
import LogoForm from './LogoForm';

const mapState = state => ({
  logo: getOrganizationLogo(state),
});

const mapDispatch = {
  saveLogo,
  setLogo,
};

export default connect(
  mapState,
  mapDispatch,
)(LogoForm);
