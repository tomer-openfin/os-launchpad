import * as React from 'react';

import { TabWrapper } from './Tab.css';

export interface Props {
  className?: string;
  children: React.ReactNode;
  id: string;
  title: string | (() => React.ReactNode);
}

const Tab = ({ children, className }: Props) => <TabWrapper className={className}>{children}</TabWrapper>;

export default Tab;
