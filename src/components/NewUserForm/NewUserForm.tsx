import * as React from 'react';

import { MetaWithCallbacks, PushRoute, User } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { createPushRouteHandler } from '../../utils/routeHelpers';

import RequestForm from '../RequestForm';
import UserForm from '../UserForm';

interface Props {
  createUser: Function;
  onEscDown: () => void;
  pushRoute: PushRoute;
}

interface State {
  isPasswordShown: boolean;
}

const emptyUser: User = {
  email: '',
  firstName: '',
  id: '',
  isAdmin: false,
  lastName: '',
  middleInitial: '',
  phone: '',
  tmpPassword: '',
  username: '',
};

const defaultState: State = {
  isPasswordShown: false,
};

class NewUserForm extends React.Component<Props, State> {
  state = defaultState;

  togglePasswordFieldType = () => {
    this.setState(prevState => ({ isPasswordShown: !prevState.isPasswordShown }));
  };

  handleFormSubmit = (formData, meta: MetaWithCallbacks) => {
    const { createUser } = this.props;

    // default to +1 for country code for now
    const payload = { ...formData, phone: `+1${formData.phone}` };

    createUser(payload, meta);
  };

  renderForm = ({ isSubmitting, isValid }) => (
    <UserForm
      isSubmitting={isSubmitting}
      isValid={isValid}
      withPasswordField
      isPasswordShown={this.state.isPasswordShown}
      togglePasswordFieldType={this.togglePasswordFieldType}
    />
  );

  render() {
    const { pushRoute } = this.props;

    return (
      <RequestForm
        initialValues={emptyUser}
        errorMessage="There was an error trying to create this user"
        form={this.renderForm}
        headingText={`Create New User`}
        onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS)}
        submit={this.handleFormSubmit}
      />
    );
  }
}

export default NewUserForm;
