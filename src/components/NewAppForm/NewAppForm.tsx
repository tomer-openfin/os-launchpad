import { ErrorMessage, Field, Formik } from 'formik';
import * as React from 'react';

import * as EmptyLogo from '../../assets/empty-logo.svg';
// import * as helpIcon from '../../assets/Help.svg';
import * as refreshIcon from '../../assets/Refresh.svg';

import Button, { ButtonLink } from '../Button/Button.css';
import Checkbox from '../Checkbox';
import { Error, FormWrapper, Label, LabelText, Message, ScrollWrapper, Wrapper } from '../NewUserForm';
import { ButtonWrapper, CheckboxWrapper, Footer, GridWrapper, IconWrapper, RefreshIcon } from './AppForms.css';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../const/Samples';
import { Color } from '../../styles';
import { App, ResponseStatus } from '../../types/commons';
import noop from '../../utils/noop';
import { validateTextField, validateURL } from '../../utils/validators';
import { ROUTES } from '../Router/consts';
import WindowHeader from '../WindowHeader/index';

interface Props {
  createApp: Function;
  location: {
    state: App;
  };
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
  submitDisabled: boolean;
}

const renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <Checkbox name="intents" key={index} value={intent.displayName} />);

const renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <Checkbox name="contexts" key={index} value={context.$type} />);

class NewAppForm extends React.Component<Props, State> {
  currentLogo: string;

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      formContents: {
        appPage: '',
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
      },
      responseReceived: false,
      result: {
        message: '',
        status: 'failure',
      },
      submitDisabled: false,
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

  handleFormSubmit = (payload, actions) => {
    const { createApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // modify App Title to create the App Name (removed input field for this) and needed for payload
    // todo: ensure uniqueness -> sync up with OF Brian, how is this being handled on BE?
    const appTitle = payload.title;
    payload.name = appTitle.replace(/\s/g, '');

    createApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderFormSection = ({ isValid, isSubmitting }) => {
    const { submitDisabled } = this.state;

    return (
      <FormWrapper>
        <WindowHeader backgroundColor={Color.VACUUM} withoutClose>
          Create New App
        </WindowHeader>

        <ScrollWrapper>
          <GridWrapper>
            <Label>
              <LabelText>Manifest URL {/*<HelpIcon imgSrc={helpIcon} size={20} />*/}</LabelText>

              <Field type="text" name="manifest_url" validate={validateURL} placeholder="Enter manifest url" />

              <IconWrapper>
                <RefreshIcon onClick={noop} imgSrc={refreshIcon} size={40} />
              </IconWrapper>

              <ErrorMessage component={Error} name="manifest_url" />
            </Label>

            <Label>
              <LabelText>App Title</LabelText>

              <Field type="text" name="title" validate={validateTextField} placeholder="Enter app title" />

              <ErrorMessage component={Error} name="title" />
            </Label>

            <Label>
              <LabelText>Description</LabelText>

              <Field component="textarea" name="description" validate={validateTextField} placeholder="Enter description" />

              <ErrorMessage component={Error} name="description" />
            </Label>

            <Label>
              <LabelText>App Icon URL</LabelText>

              <Field type="text" name="icon" validate={validateURL} placeholder="Enter app icon url" />

              <ErrorMessage component={Error} name="icon" />
            </Label>

            <Label>
              <LabelText>Accepted Intent(s)</LabelText>

              <CheckboxWrapper>{renderMockIntents()}</CheckboxWrapper>
            </Label>

            <Label>
              <LabelText>Accepted Context(s)</LabelText>

              <CheckboxWrapper>{renderMockContexts()}</CheckboxWrapper>
            </Label>

            {/* {this.renderScreenshots()} */}
          </GridWrapper>
        </ScrollWrapper>

        <Footer>
          <ButtonWrapper>
            <ButtonLink to={ROUTES.ADMIN_APPS} backgroundColor={Color.MERCURY} type="button" width={128}>
              Cancel
            </ButtonLink>

            <Button type="submit" width={128} disabled={submitDisabled || isSubmitting || !isValid}>
              Save
            </Button>
          </ButtonWrapper>
        </Footer>

        {this.renderMessage()}
      </FormWrapper>
    );
  };

  renderMessage = () => {
    const { responseReceived, formContents, result } = this.state;
    const { title } = formContents;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <Error>
            There was an error trying to create {title} app: {result.message}. Please try again.
          </Error>
        );
      }
      return <Message>Success! The App '{title}' was succesfully created.</Message>;
    }

    return null;
  };

  renderScreenshots = () => {
    const { formContents } = this.state;
    const { images } = formContents;
    // todo: screenshots punted until we have ability to save images via back-end
    // todo: carousel component to cycle through screenshots
    // todo: append/PUT new screenshots to end of images array in /apps/:id
    return (
      <Label>
        {images.slice(0, 1).map(image => (
          <img src={image.url} key={image.url} />
        ))}
      </Label>
    );
  };

  render() {
    const { result, formContents, responseReceived } = this.state;
    const { id, manifest_url, name, title, description, icon, images } = formContents;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_APPS} backgroundColor={Color.MERCURY} type="button" width={128}>
          Continue
        </ButtonLink>
      </Wrapper>
    ) : (
      <Formik
        initialValues={{
          contexts: [],
          description,
          icon,
          id,
          images,
          intents: [],
          manifest_url,
          name,
          title,
        }}
        onSubmit={this.handleFormSubmit}
        validateOnChange={false}
        render={this.renderFormSection}
      />
    );
  }
}

export default NewAppForm;
