import * as React from 'react';

import { Props as TabProps } from './Tab';
import { Content, Header, TabButton, Wrapper } from './Tabs.css';

export interface Props {
  activeId?: string;
  children: React.ReactElement<TabProps> | Array<React.ReactElement<TabProps>> | null;
  className?: string;
  height?: number | string;
  onClick?: (id: string) => void;
}

export const defaultProps = {
  height: 50,
};

const Tabs = ({ activeId, children, className, height = defaultProps.height, onClick }: Props) => {
  if (!children) {
    return null;
  }

  const childrenAsArray = Array.isArray(children) ? children : [children];
  const activeIndex = childrenAsArray.findIndex(child => child.props.id === activeId);

  return (
    <Wrapper className={className}>
      <Header activeIndex={activeIndex} height={height} tabCount={childrenAsArray.length}>
        {childrenAsArray.map(({ props }) => {
          const { id, title } = props;
          const handleClick = () => (onClick ? onClick(id) : undefined);

          return (
            <TabButton key={id} isActive={activeId === id} onClick={handleClick}>
              {typeof title === 'string' ? title : title()}
            </TabButton>
          );
        })}
      </Header>

      <Content>{childrenAsArray.find(child => child.props.id === activeId)}</Content>
    </Wrapper>
  );
};

export default Tabs;
