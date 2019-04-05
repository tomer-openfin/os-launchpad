import * as React from 'react';

import { Subtract } from '../types/utils';

type Callback = () => void;

export interface MessageResponseProps {
  resetResponseError: () => void;
  message: string;
  responseError: boolean;
}

export interface PassedProps extends State {
  onResponseError: (callback?: Callback) => (error?: Error) => void;
  onResponseSuccess: (callback?: Callback) => () => void;
  resetResponseError: () => void;
}

interface State {
  responseError: boolean;
  responseMessage: string;
}

const defaultState: State = {
  responseError: false,
  responseMessage: '',
};

type WithoutPassedProps<T> = Subtract<T, PassedProps>;

const withResponseState = <P extends PassedProps>(Component: React.ComponentType<P>) =>
  class ComponentWithResponseState extends React.PureComponent<WithoutPassedProps<P>, State> {
    state: State = defaultState;

    onResponseSuccess = (callback?: Callback) => () => {
      this.setState(
        {
          ...defaultState,
        },
        callback,
      );
    };

    onResponseError = (callback?: Callback) => (error?: Error) => {
      this.setState(
        {
          responseError: true,
          responseMessage: error ? error.message : 'Unknown error',
        },
        callback,
      );
    };

    resetResponseError = () => {
      this.setState({ responseError: false });
    };

    render() {
      return (
        <Component
          {...this.props as P}
          {...this.state}
          onResponseSuccess={this.onResponseSuccess}
          onResponseError={this.onResponseError}
          resetResponseError={this.resetResponseError}
        />
      );
    }
  };

export default withResponseState;
