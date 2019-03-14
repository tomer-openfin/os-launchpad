import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MatchParams, ROUTES } from '../Router/consts';
import { Props } from './AdminUsers';

export const asRoute = (Component: React.ComponentType<Props>) => (props: RouteComponentProps<MatchParams>) => {
  const { match } = props;
  const { id, action } = match.params;

  const handleClose = () => {
    props.history.push(ROUTES.ADMIN_USERS);
  };

  const handleDelete = () => {
    props.history.push(`${ROUTES.ADMIN_USERS_DELETE}${id}`);
  };

  return <Component currentAction={action} handleClose={handleClose} handleDelete={handleDelete} id={id} />;
};
