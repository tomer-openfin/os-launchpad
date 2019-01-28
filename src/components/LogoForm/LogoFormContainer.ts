import { connect } from 'react-redux';

import { getOrganizationLogo, saveOrgLogo, setOrgLogo } from '../../redux/organization';
import LogoForm from './LogoForm';

const mapState = state => ({
  logo: getOrganizationLogo(state),
});

const mapDispatch = {
  saveLogo: saveOrgLogo,
  setLogo: setOrgLogo,
};

export default connect(
  mapState,
  mapDispatch,
)(LogoForm);
