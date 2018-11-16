import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { tempFetch } from '../../services/ApiService';
import NewUserForm from '../NewUserForm';
import UserDirectory from '../UserDirectory';

import { ContentWrapper, TabLink, TabsWrapper, Wrapper } from './Admin.css';

import AdminApps from '../AdminApps';
import ROUTES from '../Router/const';

// Temp, extract these components out to own files when ready to create these pages
const AdminSettings = ({}) => <p>Theme Settings</p>;

const NewUserFormWithProps = props => {
  // todo: update with real POST once API is ready
  return <NewUserForm createUser={tempFetch} {...props} />;
};

const ADMIN_TABBED_ROUTES = [
  {
    component: AdminSettings,
    exact: true,
    label: 'Organization Settings',
    path: ROUTES.ADMIN_SETTINGS,
  },
  {
    component: AdminApps,
    exact: true,
    label: 'App Manager',
    path: ROUTES.ADMIN_APPS,
  },
  {
    component: UserDirectory,
    exact: true,
    label: 'User Directory',
    path: ROUTES.ADMIN_USERS,
  },
];

const ADMIN_ROUTES = [
  {
    component: AdminSettings,
    exact: true,
    path: ROUTES.ADMIN,
  },
  {
    component: NewUserFormWithProps,
    exact: true,
    path: ROUTES.ADMIN_USERS_NEW,
  },
  ...ADMIN_TABBED_ROUTES,
];

interface Props {
  isAdmin: boolean;
}

const renderAdminTab = ({ path, label }) => <TabLink key={path} to={path}>{label}</TabLink>;

const renderAdminRoute = ({ component, exact, path }) => <Route key={path} exact={exact} path={path} component={component} />;

const renderAdmin = () => {
  return (
    <Wrapper>
      <TabsWrapper>
        {ADMIN_TABBED_ROUTES.map(renderAdminTab)}
      </TabsWrapper>

      <ContentWrapper>
        {ADMIN_ROUTES.map(renderAdminRoute)}
      </ContentWrapper>
    </Wrapper >
  );
};

const Admin = ({ isAdmin }: Props) => <Wrapper>{isAdmin ? renderAdmin() : <h1>You do not have clearance to see the admin tools.</h1>}</Wrapper>;

export default Admin;
