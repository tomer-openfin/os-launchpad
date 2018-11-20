import * as React from 'react';

import { TabLink, TabsWrapper, Wrapper } from './Admin.css';

import ROUTES from '../Router/const';

const ADMIN_TABBED_ROUTES = [
  {
    label: 'Organization Settings',
    path: ROUTES.ADMIN_SETTINGS,
  },
  {
    label: 'App Manager',
    path: ROUTES.ADMIN_APPS,
  },
  {
    label: 'User Directory',
    path: ROUTES.ADMIN_USERS,
  },
];

interface Props {
  isAdmin: boolean;
  children?: React.ReactNode;
}

const renderAdminTab = ({ path, label }) => (
  <TabLink key={path} to={path}>
    {label}
  </TabLink>
);

const renderAdmin = children => {
  return (
    <Wrapper>
      <TabsWrapper>{ADMIN_TABBED_ROUTES.map(renderAdminTab)}</TabsWrapper>

      {children}
    </Wrapper>
  );
};

const Admin = (props: Props) => {
  const { isAdmin, children } = props;
  return <Wrapper>{isAdmin ? renderAdmin(children) : <h1>You do not have clearance to see the admin tools.</h1>}</Wrapper>;
};

export default Admin;
