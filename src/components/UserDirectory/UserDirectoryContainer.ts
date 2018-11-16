import { connect } from 'react-redux';
import MockUserData from './MockUserData';
import UserDirectory from './UserDirectory';

// TODO: pull up into redux and mock consumption as it would be in API, then pull in here with selector
const stateProps = state => ({
  users: MockUserData,
});

export default connect(stateProps)(UserDirectory);
