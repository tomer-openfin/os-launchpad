import { Formik } from 'formik';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import * as EmptyLogo from '../../assets/empty-logo.svg';

import { ErrorResponseMessage, ErrorWrapper, Wrapper } from '../UserForm';

import { Color } from '../../styles';
import { App, ResponseStatus } from '../../types/commons';
import AppForm from '../AppForm';
import { ROUTES } from '../Router/consts';
import WindowHeader from '../WindowHeader';

interface Props {
  createApp: Function;
  onEscDown: () => void;
}

interface State {
  updatedLogo: string;
  file: File | null;
  formContents: App;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

class NewAppForm extends React.Component<Props, State> {
  currentLogo: string;

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      formContents: {
        appPage: '',
        appUrl: '',
        contact_email: '',
        contexts: [],
        description: '',
        icon: '',
        id: '',
        images: [],
        intents: [],
        manifest_url: '',
        name: '',
        publisher: '',
        signature: '',
        support_email: '',
        title: '',
        withAppUrl: true,
      },
      responseReceived: false,
      result: {
        message: '',
        status: 'failure',
      },
      updatedLogo: '',
    };

    this.currentLogo = EmptyLogo;
  }

  errorCb = message => {
    this.setState({
      responseReceived: true,
      result: {
        message,
        status: ResponseStatus.FAILURE,
      },
    });
  };

  successCb = () =>
    this.setState({
      responseReceived: true,
      result: {
        status: ResponseStatus.SUCCESS,
      },
    });

  handleFormSubmit = (formData, actions) => {
    const { createApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // modify App Title to create the App Name (removed input field for this) and needed for formData
    // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
    formData.name = formData.title.replace(/\s/g, '');

    let payload;

    // Strip out manifest if appUrl and vice versa
    if (!!formData.withAppUrl) {
      const { manifest_url, withAppUrl, ...rest } = formData;
      payload = rest;
    } else {
      const { appUrl, withAppUrl, ...rest } = formData;
      payload = rest;
    }

    createApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderMessage = () => {
    const { responseReceived, formContents, result } = this.state;
    const { title } = formContents;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <ErrorResponseMessage>
            There was an error trying to create {title} app: {result.message}. Please try again.
          </ErrorResponseMessage>
        );
      }
      return <Redirect to={ROUTES.ADMIN_APPS} />;
    }

    return null;
  };

  render() {
    const { formContents } = this.state;
    const { id, appUrl, contexts, intents, manifest_url, name, title, description, icon, images, withAppUrl } = formContents;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM}>Create New App</WindowHeader>

        <Formik
          initialValues={{
            appUrl,
            contexts,
            description,
            icon,
            id,
            images,
            intents,
            manifest_url,
            name,
            title,
            withAppUrl,
          }}
          onSubmit={this.handleFormSubmit}
          validateOnChange={false}
          render={AppForm}
        />

        <ErrorWrapper>{this.renderMessage()}</ErrorWrapper>
      </Wrapper>
    );
  }
}

export default NewAppForm;
