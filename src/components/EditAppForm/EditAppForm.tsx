import { ErrorMessage, Field, Form, Formik, FormikHandlers } from 'formik';
import * as React from 'react';

import LogoInput from '../LogoInput/LogoInput';
import { Button, ButtonLink, Copy, Error, GridContainer, Heading, Label, LogoLabel, Message, Row, Wrapper } from './EditAppForm.css';

import { FILE_ACCEPT, RESPONSE_FAILURE, RESPONSE_OK, saveAppLogo, updateApp } from '../../services/ApiService';
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
  updatedLogo: string;
  file: File | null;
  responseContents: App;
  responseReceived: boolean;
  result: UpdateAppResponse;
}

class EditAppForm extends React.Component<Props, State> {
  currentLogo: string;

  constructor(props) {
    super(props);

    this.state = {
      file: null,
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
      updatedLogo: props.location.state.icon,
    };

    this.currentLogo = props.location.state.icon;
  }

  componentWillUnmount() {
    this.handleResetProps();
  }

  handleResetProps = () => {
    const { icon } = this.props.location.state;

    if (this.currentLogo !== icon) {
      URL.revokeObjectURL(icon);
      this.currentLogo = icon;
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
    const { location } = this.props;
    const { icon } = location.state;

    const file = files[0];
    URL.revokeObjectURL(icon);
    const fileBlob = URL.createObjectURL(file);

    this.setState({ file, updatedLogo: fileBlob });
  };

  handleLogoSubmit = () => {
    const { location } = this.props;
    const { icon } = location.state;
    const { file } = this.state;

    if (!file) {
      return;
    }

    saveAppLogo(file)
      .then(nextLogo => {
        URL.revokeObjectURL(icon);
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
    const { location } = this.props;
    const {
      appPage,
      contact_email,
      contexts,
      description,
      id,
      icon,
      title,
      images,
      intents,
      manifest_url,
      publisher,
      signature,
      support_email,
    } = location.state;

    // try to update the app logo
    this.handleLogoSubmit();

    updateApp(inputValues)
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
        // temp force success flow message
        this.setState({ responseReceived: true, result: { status: RESPONSE_FAILURE } });

        // tslint:disable-next-line:no-console
        console.log('There was an error with the API for updateApp:', err);
      });

    actions.setSubmitting(false);
  };

  renderFormSection = ({ setFieldValue, handleReset, isValid, dirty }) => {
    const { location } = this.props;
    const { intents, contexts } = location.state;

    return (
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
              {intents.map((intent, index) => (
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
              {contexts.map((context, index) => (
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
  };

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
    const { responseReceived } = this.state;

    const { location } = this.props;
    const { title } = location.state;

    if (responseReceived) {
      if (result.status === RESPONSE_OK) {
        return <Message>Success! The App '{title}' was succesfully updated.</Message>;
      }
      return <Error>There was an error trying to update {title}. Please try again.</Error>;
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
        Screenshot(s): only render 1 image for now until cycle w/ carousel
        {images.slice(0, 1).map(image => (
          <img src={image.url} key={image.url} />
        ))}
      </Label>
    );
  };

  render() {
    const { result } = this.state;

    const { location } = this.props;
    const { id, manifest_url, name, title, description, icon, images, intents, contexts } = location.state;

    // tslint:disable:jsx-no-multiline-js
    // tslint:disable:jsx-no-lambda
    return (
      <Wrapper>
        <Heading>Edit App</Heading>

        <Copy>Please verify and/or update the following fields:</Copy>

        <Formik
          initialValues={{
            [AppFormNames.Logo]: '',
          }}
          key={this.currentLogo}
          onSubmit={this.handleLogoSubmit}
          render={this.renderLogoSection}
        />

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

        {this.renderResponse(result)}
      </Wrapper>
    );
  }
}

export default EditAppForm;
