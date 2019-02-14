import * as React from 'react';

import { Props as TabProps } from './Tab';
import Tabs, { Props } from './Tabs';

interface State {
  activeId: string;
}

export class TabsWithControlledState extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { activeId, children } = props;
    let childrenAsArray: Array<React.ReactElement<TabProps>> = [];
    if (Array.isArray(children)) {
      childrenAsArray = children;
    } else if (children !== null) {
      childrenAsArray.push(children);
    }

    this.state = {
      activeId: activeId || (childrenAsArray.length ? childrenAsArray[0].props.id : ''),
    };
  }

  handleSetActiveId = (activeId: string) => {
    this.setState({ activeId });
  };

  render() {
    const { activeId } = this.state;
    return (
      <Tabs {...this.props} activeId={activeId} onClick={this.handleSetActiveId}>
        {this.props.children}
      </Tabs>
    );
  }
}
