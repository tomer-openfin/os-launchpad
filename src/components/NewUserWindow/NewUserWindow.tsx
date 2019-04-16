import * as React from 'react';

import { DispatchRequest, User, UserFormData, YesNo } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import FormWindow from '../FormWindow';
import UserFormik from '../UserForm';
import { newUserSchema } from '../UserForm/utils';

interface Props extends ResponseProps {
  createUser: DispatchRequest<User>;
  onEscDown: () => void;
  handleCancel: () => void;
  handleSuccess: () => void;
}

const emptyUser: UserFormData = {
  email: '',
  firstName: '',
  id: '',
  isAdmin: YesNo.No,
  lastName: '',
  middleName: '',
  phone: '',
  sendEmail: true,
  tmpPassword: '',
  username: '',
};

class NewUserWindow extends React.Component<Props> {
  handleSubmitValues = (formData: UserFormData): Promise<void> => {
    const { createUser, handleSuccess, onResponseError, onResponseSuccess } = this.props;

    // default to +1 for country code for now
    const newUser = { ...formData, isAdmin: formData.isAdmin === YesNo.Yes, phone: `+1${formData.phone}` };
    return new Promise(resolve => {
      createUser(newUser, {
        onFailure: onResponseError(resolve),
        onSuccess: onResponseSuccess(() => {
          handleSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { handleCancel, responseError, responseMessage, resetResponseError } = this.props;

    return (
      <FormWindow
        headingText="Create New User"
        responseError={responseError}
        resetResponseError={resetResponseError}
        message={`There was an error trying to create this user: ${responseMessage} Please try again.`}
      >
        <UserFormik
          handleSubmitValues={this.handleSubmitValues}
          handleCancel={handleCancel}
          initialValues={emptyUser}
          validationSchema={newUserSchema}
          withPasswordField={true}
        />
      </FormWindow>
    );
  }
}

export default NewUserWindow;
