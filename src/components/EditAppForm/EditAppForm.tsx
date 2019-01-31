import { Formik } from 'formik';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import * as trashIcon from '../../assets/Trash.svg';

import { ResponseStatus } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { Color } from '../../styles';
import { HeadingText } from '../ConfirmUserDelete/ConfirmDelete.css';
import { ErrorResponseMessage, ErrorWrapper, Wrapper } from '../UserForm';

import AppForm from '../AppForm';
import SvgIcon from '../SvgIcon/SvgIcon';
import WindowHeader from '../WindowHeader';

interface Props extends RouteComponentProps {
  onEscDown: () => void;
  updateApp: Function;
}

interface State {
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

const defaultProps: Partial<Props> = {};

class EditAppForm extends React.Component<Props, State> {
  static defaultProps = defaultProps;

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

  handleFormSubmit = (formData, actions) => {
    const { updateApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    let payload;

    // Strip out manifest if appUrl and vice versa
    if (!!formData.withAppUrl) {
      const { manifest_url, withAppUrl, ...rest } = formData;
      payload = rest;
    } else {
      const { appUrl, withAppUrl, ...rest } = formData;
      payload = rest;
    }

    updateApp(payload, meta);

    actions.setSubmitting(false);
  };

  handleDeleteIconClick = () => {
    const { history, location } = this.props;

    history.push(ROUTES.ADMIN_APPS_DELETE, location.state);
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    const { location } = this.props;
    const { title } = location.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <ErrorResponseMessage>
            Sorry, there was an error trying to update {title}, please try again. Error: {result.message}
          </ErrorResponseMessage>
        );
      }
      return <Redirect to={ROUTES.ADMIN_APPS} />;
    }

    return null;
  };

  render() {
    const { location } = this.props;
    const { appUrl, contexts, intents, id, manifest_url, name, title, description, icon, images, withAppUrl } = location.state;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM}>
          <HeadingText>{`Edit ${title}`}</HeadingText>

          <SvgIcon color={Color.MERCURY} hoverColor={Color.MARS} size={30} imgSrc={trashIcon} onClick={this.handleDeleteIconClick} />
        </WindowHeader>

        <Formik
          initialValues={{
            appUrl,
            contexts: contexts || [],
            description,
            icon,
            id,
            images,
            intents: intents || [],
            manifest_url,
            name,
            title,
            withAppUrl: !!appUrl,
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

export default EditAppForm;
