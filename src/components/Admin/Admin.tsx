import * as React from 'react';

import { ContentWrapper, TabLink, TabsWrapper, Wrapper } from './Admin.css';

import { ROUTES } from '../Router/consts';

const ADMIN_TABBED_ROUTES = [
  {
    exact: true,
    label: 'Organization Settings',
    path: ROUTES.ADMIN,
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

const renderAdminTab = ({ exact = false, path, label }) => (
  <TabLink exact={exact} key={path} to={path}>
    {label}
  </TabLink>
);

const renderAdmin = children => {
  return (
    <>
      <TabsWrapper>{ADMIN_TABBED_ROUTES.map(renderAdminTab)}</TabsWrapper>

      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

const Admin = (props: Props) => {
  const { isAdmin, children } = props;
  return <Wrapper>{isAdmin ? renderAdmin(children) : <h1>You do not have clearance to see the admin tools.</h1>}</Wrapper>;
};

export default Admin;
