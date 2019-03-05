import * as React from 'react';

import { UserLayout } from '../../types/commons';
import LayoutsListItem from '../LayoutsListItem';
import { EmptyCopy, LayoutNamesWrapper, ListHeader, LoadMoreCTA, UL } from './LayoutsList.css';

interface Props {
  close: () => void;
  deleteLayout: (id: string) => void;
  layouts: UserLayout[];
  restoreLayout: (id: string) => void;
}

interface State {
  showFullList: boolean;
}

class LayoutsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showFullList: false,
    };
  }

  handleLoadMoreCTA = () => {
    this.setState(prevState => ({ showFullList: !prevState.showFullList }));
  };

  renderLayoutsList = () => {
    const { showFullList } = this.state;
    const { close, deleteLayout, layouts, restoreLayout } = this.props;

    return (
      <UL showFullList={showFullList}>
        {layouts.length > 0 ? (
          layouts.map(layout => (
            <LayoutsListItem close={close} deleteLayout={deleteLayout} id={layout.id} key={layout.id} name={layout.name} restoreLayout={restoreLayout} />
          ))
        ) : (
          <EmptyCopy>
            You don&#39;t have any saved workspaces. Save using the input above and this list will populate with your most recent workspaces.
          </EmptyCopy>
        )}
      </UL>
    );
  };

  render() {
    const { layouts } = this.props;
    const { showFullList } = this.state;

    return (
      <LayoutNamesWrapper>
        <ListHeader>Recent Workspaces</ListHeader>

        {this.renderLayoutsList()}

        {layouts.length > 6 && <LoadMoreCTA onClick={this.handleLoadMoreCTA}>{showFullList ? 'Show Less' : 'Show More'}</LoadMoreCTA>}
      </LayoutNamesWrapper>
    );
  }
}

export default LayoutsList;
