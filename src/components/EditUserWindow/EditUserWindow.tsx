import * as React from 'react';

import { DispatchRequest, User } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import EditUserFormik from '../EditUserForm';
import FormWindow from '../FormWindow';

interface Props extends ResponseProps {
  handleCancel: () => void;
  handleDelete: () => void;
  handleSuccess: () => void;
  onEscDown: () => void;
  updateUser: DispatchRequest<User>;
  user: User;
  userId: User['id'];
}

const parsePhoneWithCountryCode = (phoneNumber: string) => phoneNumber.substr(phoneNumber.length - 10);

class EditUserWindow extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // sCU lifecycle needed for 2 reasons:
    // 1. Prevents invalid ':id' from being passed in, which causes invalid re-render
    //    (this happens when url change triggers unmount until css transition completes and unmount occurs)
    // 2. Properly animate exit CSSTransitions, as a result of route switch
    return nextProps.userId === ':id' ? false : true;
  }

  handleSubmitValues = (formData: User): Promise<void> => {
    const { handleSuccess, onResponseError, onResponseSuccess, updateUser } = this.props;

    // default to +1 for country code for now
    const editedUser: User = { ...formData, phone: `+1${formData.phone}` };

    return new Promise(resolve => {
      updateUser(editedUser, {
        errorCb: onResponseError(resolve),
        successCb: onResponseSuccess(() => {
          handleSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { handleCancel, handleDelete, user, responseError, responseMessage, resetResponseError } = this.props;
    const { email, firstName, id, lastName, middleInitial, phone, username } = user;

    const initialValues = {
      email,
      firstName,
      id,
      lastName,
      middleInitial,
      phone: phone ? parsePhoneWithCountryCode(phone) : '',
      username,
    };

    return (
      <FormWindow
        headingText={`${firstName} ${lastName}`}
        responseError={responseError}
        resetResponseError={resetResponseError}
        handleDeleteIconClick={handleDelete}
        message={`There was an error trying to update ${firstName} ${lastName}: ${responseMessage} Please try again.`}
      >
        <EditUserFormik handleSubmitValues={this.handleSubmitValues} handleCancel={handleCancel} initialValues={initialValues} />
      </FormWindow>
    );
  }
}

export default EditUserWindow;
