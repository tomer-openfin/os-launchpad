import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';

import { Button, ButtonLink, Copy, Error, GridContainer, Heading, Label, Message, Row, Wrapper } from './EditAppForm.css';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../const/Samples';
import { App, ResponseStatus } from '../../types/commons';
import { validateTextField, validateURL } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

interface Props {
  updateApp: Function;
  location: {
    state: App;
  };
}

interface State {
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

class EditAppForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      responseReceived: false,
      result: {
        message: '',
        status: 'failure',
      },
    };
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
    const { updateApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // Modify payload to match expected shapes (TEMP)
    payload.intents = payload.intents.map(intent => ({ name: intent, displayName: intent }));
    payload.contexts = payload.contexts.map(context => ({ $type: context, id: context, name: context }));

    // todo: come back to, currently all PUTs failing. Investigate desired shape.
    updateApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderFormSection = ({ setFieldValue, isValid, dirty }) => {
    return (
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
              {renderMockIntents()}}
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
              {renderMockContexts()}}
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
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    const { location } = this.props;
    const { title } = location.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <Error>
            Sorry, there was an error tyring to update {title}, please try again. Error: {result.message}
          </Error>
        );
      }
      return <Message>Success! The App '{title}' was succesfully updated.</Message>;
    }

    return null;
  };

  renderScreenshots = () => {
    const { location } = this.props;
    const { images } = location.state;
    // todo: screenshots punted to next sprint
    // todo: carousel component to cycle through screenshots
    // todo: append/PUT new screenshots to end of images array in /apps/:id
    return (
      <Label>
        {/* Screenshot(s): only render 1 image for now until cycle w/ carousel */}
        {images.slice(0, 1).map(image => (
          <img src={image.url} key={image.url} />
        ))}
      </Label>
    );
  };

  render() {
    const { responseReceived, result } = this.state;
    const { location } = this.props;
    const { id, manifest_url, name, title, description, icon, images, intents, contexts } = location.state;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_APPS}>Continue</ButtonLink>
      </Wrapper>
    ) : (
      <Wrapper>
        <Heading>Edit App</Heading>

        <Copy>Please verify and/or update the following fields:</Copy>

        <Formik
          initialValues={{
            contexts,
            description,
            icon,
            id,
            images,
            intents,
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

export default EditAppForm;
