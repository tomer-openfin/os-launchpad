import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import UserDirectory from '../UserDirectory';

import { LinksWrapper, TabsWrapper, TabWrapper, Wrapper } from './';

import { APP_MANAGER_SUB_ROUTE, IMPORT_USERS_SUB_ROUTE, NEW_USER_SUB_ROUTE, THEME_SETTINGS_SUB_ROUTE, USER_DIRECTORY_SUB_ROUTE } from '../Router/const';

interface Props {
  isAdmin: boolean;
}

const Tabs = () => {
  return (
    <Router>
      <TabsWrapper>
        <LinksWrapper>
          <TabWrapper>
            <TabLink activeOnlyWhenExact={true} label="App Manager" to={APP_MANAGER_SUB_ROUTE} />
          </TabWrapper>

          <TabWrapper>
            <TabLink activeOnlyWhenExact={true} label="User Directory" to={USER_DIRECTORY_SUB_ROUTE} />
          </TabWrapper>

          <TabWrapper>
            <TabLink activeOnlyWhenExact={true} label="Theme Settings" to={THEME_SETTINGS_SUB_ROUTE} />
          </TabWrapper>
        </LinksWrapper>

        <Route exact path={APP_MANAGER_SUB_ROUTE} component={AppManager} />

        <Route exact path={USER_DIRECTORY_SUB_ROUTE} component={UserDirectory} />

        <Route exact path={THEME_SETTINGS_SUB_ROUTE} component={ThemeSettings} />
      </TabsWrapper>
    </Router>
  );
};

const TabLink = ({ label, to, activeOnlyWhenExact }) => {
  // todo: look into simplifying this via styled-component
  // tslint:disable:jsx-no-lambda
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? 'active-tab' : ''}>
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
};

const renderDashboard = () => {
  return (
    <>
      <Link to={NEW_USER_SUB_ROUTE}>Create New User</Link> <Link to={IMPORT_USERS_SUB_ROUTE}>Import Users</Link>
      <Tabs />
    </>
  );
};

const Admin = ({ isAdmin }: Props) => <Wrapper>{isAdmin ? renderDashboard() : <h1>You do not have clearance to see the admin tools.</h1>}</Wrapper>;

// Temp, extract these components out to own files when ready to create these pages
const AppManager = ({}) => <p>App Manager</p>;
const ThemeSettings = ({}) => <p>Theme Settings</p>;

export default Admin;
