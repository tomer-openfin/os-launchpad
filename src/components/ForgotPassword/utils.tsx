import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ROUTES } from '../Router/consts';
import { Props } from './ForgotPassword';

export const asRoute = (Component: React.ComponentType<Props>) => (props: RouteComponentProps) => {
  const handleClose = () => {
    props.history.push(ROUTES.LOGIN);
  };
  return <Component handleClose={handleClose} />;
};
