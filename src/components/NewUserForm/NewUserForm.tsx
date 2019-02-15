import * as React from 'react';
import * as Yup from 'yup';

import { MetaWithCallbacks, PushRoute, User } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import { ROUTES } from '../Router/consts';

import RequestForm from '../RequestForm';
import UserForm, { baseSchema } from '../UserForm';

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
  lastName: '',
  middleInitial: '',
  phone: '',
  tmpPassword: '',
  username: '',
};

const defaultState: State = {
  isPasswordShown: false,
};

const validationSchema = Yup.object().shape(baseSchema);

class NewUserForm extends React.Component<Props, State> {
  state = defaultState;

  togglePasswordFieldType = () => {
    this.setState(prevState => ({ isPasswordShown: !prevState.isPasswordShown }));
  };

  handleFormSubmit = (formData: User, meta: MetaWithCallbacks) => {
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
        render={this.renderForm}
        headingText="Create New User"
        onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS)}
        submit={this.handleFormSubmit}
        validationSchema={validationSchema}
      />
    );
  }
}

export default NewUserForm;
