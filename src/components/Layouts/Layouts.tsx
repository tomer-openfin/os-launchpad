import * as React from 'react';

import { MetaWithAsyncHandlers, UserLayout } from '../../types/commons';

import LayoutsList from '../LayoutsList';
import LayoutsUserActions from '../LayoutsUserActions';
import { ActionsWrapper, Header, Title, Wrapper } from './Layouts.css';

interface Props {
  close: () => void;
  deleteLayout: (id: string, meta: MetaWithAsyncHandlers<UserLayout['id']>) => void;
  layouts: UserLayout[];
  restoreLayout: (id: string) => void;
  shareLayout: (id: UserLayout['id'], meta: { onSuccess: () => void, onFailure: () => void }) => void;
}

const Layouts = ({ close, deleteLayout, layouts, restoreLayout, shareLayout }: Props) => {
  return (
    <Wrapper>
      <ActionsWrapper>
        <Header>
          <Title>Workspaces</Title>
        </Header>

        <LayoutsUserActions />
      </ActionsWrapper>
      <LayoutsList close={close} layouts={layouts} restoreLayout={restoreLayout} deleteLayout={deleteLayout} shareLayout={shareLayout}/>
    </Wrapper>
  );
};

export default Layouts;
