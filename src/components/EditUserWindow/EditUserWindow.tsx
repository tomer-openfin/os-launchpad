import * as React from 'react';

import { DispatchRequest, User, UserFormData, YesNo } from '../../types/commons';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import FormWindow from '../FormWindow';
import UserFormik, { editUserSchema } from '../UserForm';

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

  handleSubmitValues = (formData: UserFormData): Promise<void> => {
    const { handleSuccess, onResponseError, onResponseSuccess, updateUser } = this.props;
    // default to +1 for country code for now
    const editedUser: User = { ...formData, isAdmin: formData.isAdmin === YesNo.Yes, phone: `+1${formData.phone}` };

    return new Promise(resolve => {
      updateUser(editedUser, {
        onFailure: onResponseError(resolve),
        onSuccess: onResponseSuccess(() => {
          handleSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { handleCancel, handleDelete, user, responseError, responseMessage, resetResponseError } = this.props;
    const { email, firstName, id, isAdmin, lastName, middleName, phone, username } = user;

    const initialValues = {
      email,
      firstName,
      id,
      isAdmin: isAdmin ? YesNo.Yes : YesNo.No,
      lastName,
      middleName,
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
        <UserFormik
          handleSubmitValues={this.handleSubmitValues}
          handleCancel={handleCancel}
          initialValues={initialValues}
          validationSchema={editUserSchema}
          withPasswordField={false}
        />
      </FormWindow>
    );
  }
}

export default EditUserWindow;
