import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';
import * as EmptyLogo from '../../assets/empty-logo.svg';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../const/Samples';
import { validateTextField, validateURL } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

import { App, ResponseStatus } from '../../types/commons';

import { Button, ButtonLink, Copy, Error, GridContainer, Heading, Label, Message, Row, Wrapper } from '../EditAppForm/EditAppForm.css';

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
}

const mapSelectedOptions = (event: React.FormEvent<HTMLSelectElement>) => Array.from(event.currentTarget.selectedOptions).map(option => option.value);

const renderMockIntents = () =>
  MOCK_INTENTS.map((intent, index) => (
    <option key={index} value={intent.displayName}>
      {intent.displayName}
    </option>
  ));

const renderMockContexts = () =>
  MOCK_CONTEXTS.map((context, index) => (
    <option key={index} value={context.$type}>
      {context.$type}
    </option>
  ));

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

    createApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderFormSection = ({ setFieldValue, isValid, dirty }) => (
    <Form>
      <GridContainer>
        <Label>
          Icon URL
          <Field type="text" name="icon" validate={validateURL} />
          <ErrorMessage component={Error} name="icon" />
        </Label>

        <Label>
          Manifest URL
          <Field type="text" name="manifest_url" validate={validateURL} />
          <ErrorMessage component={Error} name="manifest_url" />
        </Label>

        <Label>
          Accepted Intent(s)
          <Field
            component="select"
            multiple={true}
            name="intents"
            // tslint:disable:jsx-no-lambda
            onChange={event => setFieldValue('intents', mapSelectedOptions(event))}
          >
            {renderMockIntents()}
          </Field>
        </Label>

        <Label>
          Title
          <Field type="text" name="title" validate={validateTextField} />
          <ErrorMessage component={Error} name="title" />
        </Label>

        <Label>
          Accepted Context(s)
          <Field
            component="select"
            multiple={true}
            name="contexts"
            // tslint:disable:jsx-no-lambda
            onChange={event => setFieldValue('contexts', mapSelectedOptions(event))}
          >
            {renderMockContexts()}
          </Field>
        </Label>

        <Label>
          Name
          <Field type="text" name="name" validate={validateTextField} />
          <ErrorMessage component={Error} name="name" />
        </Label>

        {/* {this.renderScreenshots()} */}

        <Label>
          Description
          <Field component="textarea" name="description" validate={validateTextField} />
          <ErrorMessage component={Error} name="description" />
        </Label>
      </GridContainer>

      <Row>
        <ButtonLink to={ROUTES.ADMIN_APPS}>Cancel</ButtonLink>

        <Button type="submit" disabled={!isValid || !dirty}>
          Save
        </Button>
      </Row>
    </Form>
  );

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
    // todo: screenshots punted to next sprint
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

        <ButtonLink to={ROUTES.ADMIN_APPS}>Continue</ButtonLink>
      </Wrapper>
    ) : (
      <Wrapper>
        <Heading>Add App</Heading>

        <Copy>Please verify and/or update the following fields:</Copy>

        <Formik
          initialValues={{
            contexts: MOCK_CONTEXTS,
            description,
            icon,
            id,
            images,
            intents: MOCK_INTENTS,
            manifest_url,
            name,
            title,
          }}
          onSubmit={this.handleFormSubmit}
          validateOnChange={false}
          render={this.renderFormSection}
        />

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default NewAppForm;
