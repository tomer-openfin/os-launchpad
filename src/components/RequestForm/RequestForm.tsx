import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';
import { ObjectSchema } from 'yup';

import * as trashIcon from '../../assets/Trash.svg';

import { DispatchRequest, MetaWithCallbacks, PushRoute, ResponseObject, ResponseStatus } from '../../types/commons';

import { Color } from '../../styles';
import { HeadingText } from '../AdminConfirmation/AdminConfirmation.css';
import { MessageBannerWrapper, Wrapper } from './RequestForm.css';

import MessageBanner from '../MessageBanner';
import SvgIcon from '../SvgIcon/SvgIcon';
import WindowHeader from '../WindowHeader';

interface Props {
  errorMessage: string;
  render?: (props: FormikProps<{}>) => React.ReactNode;
  component?: React.ComponentType<FormikProps<{}>>;
  handleDeleteIconClick?: () => void;
  headingText: string;
  initialValues: {};
  onSubmitSuccess: () => ReturnType<PushRoute>;
  submit: DispatchRequest;
  validationSchema?: ObjectSchema<{}>;
}

interface State {
  responseReceived: boolean;
  result: ResponseObject;
}

const defaultState: State = {
  responseReceived: false,
  result: {
    message: '',
    status: ResponseStatus.FAILURE,
  },
};

class RequestForm extends React.Component<Props, State> {
  state: State = defaultState;
  timer: ReturnType<typeof setTimeout> | null = null;

  onError = (callback: () => void) => (message: string) =>
    this.setState(
      {
        responseReceived: true,
        result: {
          message,
          status: ResponseStatus.FAILURE,
        },
      },
      callback,
    );

  onSuccess = (callback: () => void) => () =>
    this.setState(
      {
        responseReceived: true,
        result: {
          status: ResponseStatus.SUCCESS,
        },
      },
      callback,
    );

  finishSubmitting = (actions: FormikActions<{}>) => actions.setSubmitting(false);

  handleFormSubmit = (payload, actions: FormikActions<{}>) => {
    const { onSubmitSuccess, submit } = this.props;

    this.clearTimer();

    const onSuccessCallback = () => {
      this.finishSubmitting(actions);
      onSubmitSuccess();
    };

    const onErrorCallback = () => {
      this.finishSubmitting(actions);
      this.timer = setTimeout(this.resetErrorState, 5000);
    };

    const meta: MetaWithCallbacks = { successCb: this.onSuccess(onSuccessCallback), errorCb: this.onError(onErrorCallback) };

    submit(payload, meta, actions);
  };

  resetErrorState = () =>
    this.setState(
      {
        responseReceived: defaultState.responseReceived,
      },
      this.clearTimer,
    );

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  renderMessage = () => {
    const { errorMessage } = this.props;
    const { responseReceived, result } = this.state;

    return (
      <MessageBannerWrapper>
        <MessageBanner handleClose={this.resetErrorState} message={`${errorMessage}: ${result.message} Please try again.`} shown={responseReceived} />
      </MessageBannerWrapper>
    );
  };

  render() {
    const { component, handleDeleteIconClick, headingText, initialValues, render, validationSchema } = this.props;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM}>
          <HeadingText>{headingText}</HeadingText>

          {handleDeleteIconClick && <SvgIcon color={Color.MERCURY} hoverColor={Color.MARS} size={30} imgSrc={trashIcon} onClick={handleDeleteIconClick} />}
        </WindowHeader>

        <Formik initialValues={initialValues} onSubmit={this.handleFormSubmit} component={component} render={render} validationSchema={validationSchema} />

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default RequestForm;
