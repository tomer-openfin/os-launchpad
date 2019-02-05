import { Formik, FormikActions, FormikProps } from 'formik';
import * as React from 'react';

import * as trashIcon from '../../assets/Trash.svg';

import { MetaWithCallbacks, PushRoute, RequestFormSubmit, ResponseObject, ResponseStatus } from '../../types/commons';

import { Color } from '../../styles/index';
import { HeadingText } from '../ConfirmUserDelete/ConfirmDelete.css';
import { MessageBannerWrapper, Wrapper } from './RequestForm.css';

import MessageBanner from '../MessageBanner';
import SvgIcon from '../SvgIcon/SvgIcon';
import WindowHeader from '../WindowHeader';

interface Props {
  errorMessage: string;
  form: (props: FormikProps<{}>) => React.ReactNode;
  handleDeleteIconClick?: () => void;
  headingText: string;
  initialValues: {};
  onSubmitSuccess: () => ReturnType<PushRoute>;
  submit: RequestFormSubmit;
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
    const { handleDeleteIconClick, headingText, initialValues, form } = this.props;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM}>
          <HeadingText>{headingText}</HeadingText>

          {handleDeleteIconClick && <SvgIcon color={Color.MERCURY} hoverColor={Color.MARS} size={30} imgSrc={trashIcon} onClick={handleDeleteIconClick} />}
        </WindowHeader>

        <Formik initialValues={initialValues} onSubmit={this.handleFormSubmit} validateOnChange render={form} />

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default RequestForm;
