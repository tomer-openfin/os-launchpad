import { ErrorMessage, Field, Form, Formik, FormikHandlers } from 'formik';
import * as React from 'react';
import * as EmptyLogo from '../../assets/empty-logo.svg';

import { Button, ButtonLink, Copy, Error, GridContainer, Heading, Label, LogoLabel, Message, Row, Wrapper } from '../EditAppForm/EditAppForm.css';
import LogoInput from '../LogoInput/LogoInput';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../const/Samples';
import { createApp, FILE_ACCEPT, RESPONSE_FAILURE, RESPONSE_OK, saveAppLogo } from '../../services/ApiService';
import { App, AppFormNames, CreateAppResponse } from '../../types/commons';
import { validateTextField, validateURL } from '../../utils/validators';
import ROUTES from '../Router/const';

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
  responseContents: App;
  responseReceived: boolean;
  result: CreateAppResponse;
}

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
      responseContents: {
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

  componentWillUnmount() {
    this.handleResetProps();
  }

  handleResetProps = () => {
    const { updatedLogo } = this.state;

    if (this.currentLogo !== updatedLogo) {
      URL.revokeObjectURL(updatedLogo);
      this.currentLogo = updatedLogo;
    }
  };

  handleReset = (fn: FormikHandlers['handleReset']) => () => {
    // Execute Formik default handleReset functionality
    fn();

    // But also reset custom side effects needed in redux and state
    this.handleResetProps();
    const { file } = this.state;
    if (file) {
      this.setState({ file: null });
    }
  };

  handleLogoFileChange = (fn: FormikHandlers['handleChange']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Must pass checks to change file input
    // 1 - Files must exist
    // 2 - Must have at least 1 file
    // 3 - First file must pass accepted file type
    if (!files || !files.length || files[0].type.indexOf(FILE_ACCEPT.replace('*', '')) !== 0) {
      return;
    }

    // Execute Formik default handleChange functionality
    fn(e);

    // Formik does not keep file objects
    // So we must add in additonal logic to the default
    // to handle this cause with local state
    const { updatedLogo } = this.state;

    const file = files[0];
    URL.revokeObjectURL(updatedLogo);
    const fileBlob = URL.createObjectURL(file);

    this.setState({ file, updatedLogo: fileBlob });
  };

  handleAppLogoSubmit = () => {
    const { file, updatedLogo } = this.state;

    if (!file) {
      return;
    }

    saveAppLogo(file)
      .then(nextLogo => {
        URL.revokeObjectURL(updatedLogo);
        this.currentLogo = nextLogo;
        this.forceUpdate();
      })
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.log('Error saving logo:', e);
      });

    // need to PUT new logo path on /app/:id
  };

  handleFormSubmit = (inputValues, actions) => {
    const { formContents } = this.state;
    const { appPage, contact_email, contexts, description, id, icon, title, images, intents, manifest_url, publisher, signature, support_email } = formContents;
    // try to update the app logo
    // this.handleAppLogoSubmit();

    createApp(inputValues)
      .then(resp => {
        if (resp.status === RESPONSE_OK) {
          this.setState({
            responseContents: {
              appPage,
              contact_email,
              contexts,
              description,
              icon,
              id,
              images,
              intents,
              manifest_url,
              name,
              publisher,
              signature,
              support_email,
              title,
            },
            responseReceived: true,
            result: {
              status: RESPONSE_OK,
            },
          });
        }

        this.setState({
          responseReceived: true,
          result: {
            status: RESPONSE_FAILURE,
          },
        });
      })
      .catch(err => {
        // temp force error flow message
        this.setState({ responseReceived: true, result: { status: RESPONSE_FAILURE } });

        // tslint:disable-next-line:no-console
        console.log('There was an error with the API for createApp:', err);
      });

    actions.setSubmitting(false);
  };

  renderFormSection = ({ setFieldValue, handleReset, isValid, dirty }) => (
    <Form>
      <GridContainer>
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
            onChange={event => setFieldValue('intents', [].slice.call(event.target.selectedOptions).map(option => option.value))}
          >
            {MOCK_INTENTS.map((intent, index) => (
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
            onChange={event => setFieldValue('contexts', [].slice.call(event.target.selectedOptions).map(option => option.value))}
          >
            {MOCK_CONTEXTS.map((context, index) => (
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
        <ButtonLink to={ROUTES.ADMIN_APPS} onClick={this.handleReset(handleReset)}>
          Cancel
        </ButtonLink>

        <Button type="submit" disabled={!isValid || !dirty}>
          Save
        </Button>
      </Row>
    </Form>
  );

  renderLogoSection = () => {
    const { updatedLogo } = this.state;

    return (
      <Form>
        <LogoLabel>
          Logo
          <LogoInput name={AppFormNames.Logo} logo={updatedLogo} handleFileChange={this.handleLogoFileChange} />
        </LogoLabel>
      </Form>
    );
  };

  renderResponse = result => {
    const { responseReceived, formContents } = this.state;
    const { title } = formContents;

    if (responseReceived) {
      if (result.status === RESPONSE_OK) {
        return <Message>Success! The App '{title}' was succesfully updated.</Message>;
      }
      return <Error>There was an error trying to create {title} app. Please try again.</Error>;
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
    const { result, formContents } = this.state;
    const { id, manifest_url, name, title, description, icon, images } = formContents;

    // tslint:disable:jsx-no-multiline-js
    // tslint:disable:jsx-no-lambda
    return (
      <Wrapper>
        <Heading>Add App</Heading>

        <Copy>Please verify and/or update the following fields:</Copy>

        <Formik
          initialValues={{
            [AppFormNames.Logo]: '',
          }}
          key={this.currentLogo}
          onSubmit={this.handleAppLogoSubmit}
          render={this.renderLogoSection}
        />

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

        {this.renderResponse(result)}
      </Wrapper>
    );
  }
}

export default NewAppForm;
