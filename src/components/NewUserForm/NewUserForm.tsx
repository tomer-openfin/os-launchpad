import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { DispatchRequest, MetaWithCallbacks, User } from '../../types/commons';

import RequestForm from '../RequestForm';
import UserForm, { baseSchema } from '../UserForm';

interface Props {
  createUser: DispatchRequest;
  handleCancel: () => void;
  handleSuccess: () => void;
  onEscDown: () => void;
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

  renderUserForm = (formikProps: FormikProps<FormikValues>) => (
    <UserForm
      {...formikProps}
      handleCancel={this.props.handleCancel}
      isPasswordShown={this.state.isPasswordShown}
      togglePasswordFieldType={this.togglePasswordFieldType}
      withPasswordField
    />
  );

  render() {
    const { handleSuccess } = this.props;

    return (
      <RequestForm
        initialValues={emptyUser}
        errorMessage="There was an error trying to create this user"
        render={this.renderUserForm}
        headingText="Create New User"
        onSubmitSuccess={handleSuccess}
        submit={this.handleFormSubmit}
        validationSchema={validationSchema}
      />
    );
  }
}

export default NewUserForm;
