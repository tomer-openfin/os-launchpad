import { connect } from 'react-redux';

import { getOrganizationActiveThemeId, getOrganizationThemes, saveOrgActiveThemeId, setOrgActiveThemeId } from '../../redux/organization';
import ThemesForm from './ThemesForm';

const mapState = state => ({
  activeThemeId: getOrganizationActiveThemeId(state),
  themes: getOrganizationThemes(state),
});

const mapDispatch = {
  saveOrgActiveThemeId,
  setOrgActiveThemeId,
};

export default connect(
  mapState,
  mapDispatch,
)(ThemesForm);
