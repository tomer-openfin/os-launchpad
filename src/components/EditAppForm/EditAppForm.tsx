import { ErrorMessage, Field, Form, Formik, FormikHandlers } from 'formik';
import * as React from 'react';

import LogoInput from '../LogoInput/LogoInput';
import { Button, ButtonLink, Copy, Error, GridContainer, Heading, Label, LogoLabel, Message, Row, Wrapper } from './EditAppForm.css';

import ApiService, { FILE_ACCEPT, RESPONSE_FAILURE, RESPONSE_OK } from '../../services/ApiService';
import { App, AppFormNames, UpdateAppResponse } from '../../types/commons';
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
        status: RESPONSE_FAILURE,
      },
    });
  };

  successCb = () =>
    this.setState({
      responseReceived: true,
      result: {
        status: RESPONSE_OK,
      },
    });

  handleFormSubmit = (payload, actions) => {
    const { updateApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    updateApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderFormSection = ({ setFieldValue, handleReset, isValid, dirty }) => {
    const { location } = this.props;
    const { intents, contexts } = location.state;

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
              {intents && intents.map((intent, index) => (
                <option key={index} value={intent.displayName}>
                  {intent.displayName}
                </option>
              ))}
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
              {contexts && contexts.map((context, index) => (
                <option key={index} value={context.$type}>
                  {context.$type}
                </option>
              ))}
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
          <ButtonLink to={ROUTES.ADMIN_APPS} >
            Cancel
          </ButtonLink>

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
      if (result.status === RESPONSE_FAILURE) {
        return <Error>There was an error trying to update {title}. Please try again.</Error>;
      }
      return <Message>Success! The App '{title}' was succesfully updated.</Message>;
    }

    return null;
  }

  renderScreenshots = () => {
    const { location } = this.props;
    const { images } = location.state;
    // todo: screenshots punted to next sprint
    // todo: carousel component to cycle through screenshots
    // todo: append/PUT new screenshots to end of images array in /apps/:id
    return (
      <Label>
        Screenshot(s): only render 1 image for now until cycle w/ carousel
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

    return (
      responseReceived && result.status === RESPONSE_OK ? (
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
      )
    );
  }
}

export default EditAppForm;
