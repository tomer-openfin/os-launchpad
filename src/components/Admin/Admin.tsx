import * as React from 'react';

import { ADMIN_TABS } from './utils';

import Tabs, { Props as TabProps } from '../Tabs';
import WindowHeader from '../WindowHeader';
import { StyledTab, Wrapper } from './Admin.css';

export interface Props {
  activeTab: string;
  children?: React.ReactNode;
  hideWindow: () => void;
  isAdmin: boolean;
  onClickTab: (path: string) => void;
}

const renderTab = (child: React.ReactNode): React.ReactElement<TabProps> | null => {
  if (!child || typeof child !== 'object' || !('props' in child)) {
    return null;
  }

  const { path } = child.props;
  if (!path || Array.isArray(path)) {
    return null;
  }

  return (
    <StyledTab key={path} id={path} title={ADMIN_TABS[path].title}>
      {child}
    </StyledTab>
  );
};

const Admin = (props: Props) => {
  const { activeTab, isAdmin, children, hideWindow, onClickTab } = props;

  if (!isAdmin) {
    return null;
  }

  return (
    <Wrapper>
      <WindowHeader handleClose={hideWindow}>Admin</WindowHeader>

      {children && (
        <Tabs activeId={activeTab} onClick={onClickTab}>
          {Array.isArray(children)
            ? children.reduce((acc: Array<React.ReactElement<TabProps>>, child) => {
                const tab = renderTab(child);
                if (tab === null) {
                  return acc;
                }
                return [...acc, tab];
              }, [])
            : renderTab(children)}
        </Tabs>
      )}
    </Wrapper>
  );
};

export default Admin;
