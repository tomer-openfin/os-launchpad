import { connect } from 'react-redux';

import withThemes from '../../hocs/withThemes';
import { getOrganizationTheme, setTheme } from '../../redux/organization';
import ThemesForm from './ThemesForm';

const mapState = state => ({
  theme: getOrganizationTheme(state),
});

const mapDispatch = {
  setTheme,
};

export default connect(
  mapState,
  mapDispatch,
)(withThemes(ThemesForm));
