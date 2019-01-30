import * as React from 'react';
import { ROUTES } from '../Router/consts';

import WindowHeader from '../WindowHeader';
import { ContentWrapper, TabLink, TabsWrapper, Wrapper } from './Admin.css';

const ADMIN_TABBED_ROUTES = [
  {
    exact: true,
    label: 'Enterprise',
    path: ROUTES.ADMIN,
  },
  {
    label: 'Apps',
    path: ROUTES.ADMIN_APPS,
  },
  {
    label: 'Users',
    path: ROUTES.ADMIN_USERS,
  },
];

interface Props {
  children?: React.ReactNode;
  hideWindow: () => void;
  isAdmin: boolean;
}

const renderAdminTab = ({ exact = false, path, label }) => (
  <TabLink exact={exact} key={path} to={path}>
    {label}
  </TabLink>
);

const renderAdmin = (children, hideWindow) => {
  return (
    <>
      <WindowHeader handleClose={hideWindow}>Admin</WindowHeader>

      <TabsWrapper>{ADMIN_TABBED_ROUTES.map(renderAdminTab)}</TabsWrapper>

      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

const Admin = (props: Props) => {
  const { isAdmin, children, hideWindow } = props;

  return <Wrapper>{isAdmin ? renderAdmin(children, hideWindow) : <h1>You do not have clearance to see the admin tools.</h1>}</Wrapper>;
};

export default Admin;
