import { connect } from 'react-redux';

import { getOrganizationAutoLogin, saveOrgAutoLogin } from '../../redux/organization';

import OrganizationSettings from './OrganizationSettings';

const mapState = state => ({
  autoLoginOrg: getOrganizationAutoLogin(state),
});

const mapDispatch = dispatch => ({
  setOrgAutoLogin: (autoLoginOrg: boolean) => dispatch(saveOrgAutoLogin(autoLoginOrg)),
});

export default connect(
  mapState,
  mapDispatch,
)(OrganizationSettings);
