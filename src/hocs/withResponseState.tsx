import * as React from 'react';

import { ResponseObject } from '../types/commons';

type Callback = () => void;

export interface MessageResponseProps {
  resetResponseError: () => void;
  message: string;
  responseError: boolean;
}

export interface PassedProps extends State {
  onResponseError: (callback?: Callback) => (response: string) => void;
  onResponseSuccess: (callback?: Callback) => (response: ResponseObject) => void;
  resetResponseError: () => void;
}

interface State {
  responseError: boolean;
  responseMessage: string;
  responsePayload;
}

const defaultState: State = {
  responseError: false,
  responseMessage: '',
  responsePayload: null,
};

type Subtract<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

type WithoutPassedProps<T> = Subtract<T, PassedProps>;

const withResponseState = <P extends PassedProps>(Component: React.ComponentType<P>) =>
  class ComponentWithResponseState extends React.PureComponent<WithoutPassedProps<P>, State> {
    state: State = defaultState;

    onResponseSuccess = (callback?: Callback) => (responsePayload: ResponseObject) =>
      this.setState(
        {
          ...defaultState,
          responsePayload,
        },
        callback,
      );

    onResponseError = (callback?: Callback) => (responsePayload: string) =>
      this.setState(
        {
          responseError: true,
          responseMessage: responsePayload,
          responsePayload,
        },
        callback,
      );

    resetResponseError = () => this.setState({ responseError: false });

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          onResponseSuccess={this.onResponseSuccess}
          onResponseError={this.onResponseError}
          resetResponseError={this.resetResponseError}
        />
      );
    }
  };

export default withResponseState;
