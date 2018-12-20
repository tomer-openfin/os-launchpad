import { ErrorMessage, Field, Formik } from 'formik';
import * as React from 'react';

// import * as helpIcon from '../../assets/Help.svg';
import * as refreshIcon from '../../assets/Refresh.svg';

import Button, { ButtonLink } from '../Button/Button.css';
import Checkbox from '../Checkbox';
import { ButtonWrapper, CheckboxWrapper, Footer, GridWrapper, RefreshIcon } from '../NewAppForm/AppForms.css';
import { Error, FormWrapper, Label, LabelText, Message, ScrollWrapper, Wrapper } from '../NewUserForm';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../const/Samples';
import { Color } from '../../styles';
import { App, ResponseStatus } from '../../types/commons';
import { validateTextField, validateURL } from '../../utils/validators';
import { ROUTES } from '../Router/consts';
import WindowHeader from '../WindowHeader/index';

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
  submitDisabled: boolean;
}

const renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <Checkbox name="intents" key={index} value={intent.displayName} />);

const renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <Checkbox name="contexts" key={index} value={context.$type} />);

class EditAppForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      responseReceived: false,
      result: {
        message: '',
        status: 'failure',
      },
      submitDisabled: false,
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
    payload.intents = payload.intents.map(index => MOCK_INTENTS[index]);
    payload.contexts = payload.contexts.map(index => MOCK_CONTEXTS[index]);

    updateApp(payload, meta);

    actions.setSubmitting(false);
  };

  renderFormSection = ({ isValid, isSubmitting }) => {
    const { submitDisabled } = this.state;
    const { location } = this.props;
    const { title } = location.state;

    return (
      <FormWrapper>
        <WindowHeader backgroundColor={Color.VACUUM} withoutClose>
          Edit {title}
        </WindowHeader>

        <ScrollWrapper>
          <GridWrapper>
            <Label>
              <LabelText>Manifest URL {/*<HelpIcon imgSrc={helpIcon} size={20} />*/}</LabelText>

              <Field type="text" name="manifest_url" validate={validateURL} placeholder="Enter manifest url" />

              <RefreshIcon imgSrc={refreshIcon} size={40} />

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
    const { contexts, intents, id, manifest_url, name, title, description, icon, images } = location.state;

    const cleanContexts = contexts === undefined ? [] : contexts.map(context => context.$type);
    const cleanIntents = intents === undefined ? [] : intents.map(intent => intent.displayName);

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
          contexts: cleanContexts,
          description,
          icon,
          id,
          images,
          intents: cleanIntents,
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

export default EditAppForm;
