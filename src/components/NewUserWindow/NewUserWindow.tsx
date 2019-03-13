import * as React from 'react';

import { DispatchRequest, User } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import FormWindow from '../FormWindow';
import NewUserFormik from '../NewUserForm';

interface Props extends ResponseProps {
  createUser: DispatchRequest<User>;
  onEscDown: () => void;
  handleCancel: () => void;
  handleSuccess: () => void;
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

class NewUserWindow extends React.Component<Props> {
  handleSubmitValues = (formData: User): Promise<void> => {
    const { createUser, handleSuccess, onResponseError, onResponseSuccess } = this.props;

    // default to +1 for country code for now
    const newUser = { ...formData, phone: `+1${formData.phone}` };

    return new Promise(resolve => {
      createUser(newUser, {
        errorCb: onResponseError(resolve),
        successCb: onResponseSuccess(() => {
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
        <NewUserFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={emptyUser} />
      </FormWindow>
    );
  }
}

export default NewUserWindow;
