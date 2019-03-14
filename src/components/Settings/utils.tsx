import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ROUTES } from '../Router/consts';
import { Props } from './Settings';

export const asRoute = (Component: React.ComponentType<Props>) => (props: RouteComponentProps<{ action: string }>) => {
  const { match } = props;
  const { action } = match.params;

  const handleClose = () => {
    props.history.push(ROUTES.SETTINGS);
  };

  const handleConfirm = () => {
    props.history.push(ROUTES.SETTINGS_CONFIRM_PASSWORD);
  };

  return <Component currentAction={action} handleClose={handleClose} handleConfirm={handleConfirm} />;
};
