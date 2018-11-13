import * as React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper } from './';

import noop from '../../utils/noop';

// interface Props {}

// interface State {}

const Admin = ({}) => (
  <Wrapper>
    <h1>Administration Dashboard</h1>

    <a href="/new-user">Create New User</a>

    <br />

    <Link to="/import-user">Import Users</Link>

    <ul>
      <li>
        <a href="/user-directory">User Directory</a>
      </li>

      <li>
        {/* todo WHIT-68: wire up and setup this new screen */}
        <Link to="/app-manager">App Manager</Link>
      </li>

      <li>
        {/* todo WHIT-111: wire up and setup this new screen */}
        <Link to="/theme-settings">Theme Settings</Link>
      </li>
    </ul>
  </Wrapper>
);

export default Admin;
