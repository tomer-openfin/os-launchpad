import { connect } from 'react-redux';

import { getOrganizationActiveThemeId, getOrganizationThemes, saveActiveThemeId, setActiveThemeId } from '../../redux/organization';
import ThemesForm from './ThemesForm';

const mapState = state => ({
  activeThemeId: getOrganizationActiveThemeId(state),
  themes: getOrganizationThemes(state),
});

const mapDispatch = {
  saveActiveThemeId,
  setActiveThemeId,
};

export default connect(
  mapState,
  mapDispatch,
)(ThemesForm);
