import * as React from 'react';

import { MetaWithAsyncHandlers, UserLayout } from '../../types/commons';

import { EmptyCopy, LayoutNamesWrapper, ListHeader, LoadMoreCTA, UL } from './LayoutsList.css';

import LayoutsListItem from '../LayoutsListItem';

interface Props {
  close: () => void;
  deleteLayout: (id: UserLayout['id'], meta: MetaWithAsyncHandlers<UserLayout['id']>) => void;
  layouts: UserLayout[];
  restoreLayout: (id: UserLayout['id']) => void;
  shareLayout: (id: UserLayout['id'], meta: { onSuccess: () => void, onFailure: () => void }) => void;
}

interface State {
  activeId: UserLayout['id'] | null;
  showFullList: boolean;
}

class LayoutsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeId: null,
      showFullList: false,
    };
  }

  handleLoadMoreCTA = () => {
    this.setState(prevState => ({ showFullList: !prevState.showFullList }));
  };

  handleClickDelete = (id: UserLayout['id']) => {
    this.setState({ activeId: id });
  };

  resetActiveId = () => {
    this.setState({ activeId: null });
  };

  handleClickShare = id => {
    const { shareLayout } = this.props;
    shareLayout(id, {onSuccess: () => undefined, onFailure: () => undefined});
  }

  renderLayoutsList = () => {
    const { activeId, showFullList } = this.state;
    const { close, deleteLayout, layouts, restoreLayout} = this.props;

    return (
      <UL showFullList={showFullList}>
        {layouts.length > 0 ? (
          layouts.map(layout => {
            const handleClickDeleteCreator = (id: UserLayout['id']) => () => this.handleClickDelete(id);
            const handleClickShareCreator = (id: UserLayout['id']) => () => this.handleClickShare(id);

            return (
              <LayoutsListItem
                activeId={activeId}
                close={close}
                deleteLayout={deleteLayout}
                handleClickDelete={handleClickDeleteCreator(layout.id)}
                handleClickShare={handleClickShareCreator(layout.id)}
                id={layout.id}
                key={layout.id}
                name={layout.name}
                resetActiveId={this.resetActiveId}
                restoreLayout={restoreLayout}
              />
            );
          })
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
