import * as React from 'react';

import { MetaWithCallbacks, UserLayout } from '../../types/commons';

import LayoutsList from '../LayoutsList';
import LayoutsUserActions from '../LayoutsUserActions';
import { ActionsWrapper, Header, Title, Wrapper } from './Layouts.css';

interface Props {
  deleteLayout: (id: string) => void;
  layouts: UserLayout[];
  onBlur: () => void;
  restoreLayout: (id: string) => void;
  saveLayout: (name: string, meta: MetaWithCallbacks) => void;
}

const Layouts = ({ deleteLayout, restoreLayout, saveLayout, onBlur, layouts }: Props) => {
  return (
    <Wrapper>
      <ActionsWrapper>
        <Header>
          <Title>Layouts</Title>
        </Header>

        <LayoutsUserActions deleteLayout={deleteLayout} saveLayout={saveLayout} />
      </ActionsWrapper>

      <LayoutsList onBlur={onBlur} layouts={layouts} restoreLayout={restoreLayout} deleteLayout={deleteLayout} />
    </Wrapper>
  );
};

export default Layouts;
