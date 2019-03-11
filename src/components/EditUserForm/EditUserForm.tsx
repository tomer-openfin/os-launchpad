import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { DispatchRequest, MetaWithCallbacks, User } from '../../types/commons';

import RequestForm from '../RequestForm';
import UserForm, { baseSchema } from '../UserForm';

interface Props {
  handleCancel: () => void;
  handleDelete: () => void;
  handleSuccess: () => void;
  id: User['id'];
  onEscDown: () => void;
  updateUser: DispatchRequest<User>;
  user: User;
}

const parsePhoneWithCountryCode = (phoneNumber: string) => phoneNumber.substr(phoneNumber.length - 10);

const createUserSubmitHandler = (submitUser: DispatchRequest<User>): DispatchRequest<User> => (formData: User, meta: MetaWithCallbacks) => {
  // default to +1 for country code for now
  const payload: User = { ...formData, phone: `+1${formData.phone}` };

  submitUser(payload, meta);
};

// tmpPassword field not needed to edit users
const { tmpPassword, ...schema } = baseSchema;
const validationSchema = Yup.object().shape(schema);

class EditUserForm extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // sCU lifecycle needed for 2 reasons:
    // 1. Prevents invalid ':id' from being passed in, which causes invalid re-render
    // 2. Properly animate exit CSSTransitions, as a result of route switch
    return nextProps.id === ':id' ? false : true;
  }

  renderUserForm = (formikProps: FormikProps<FormikValues>) => <UserForm {...formikProps} handleCancel={this.props.handleCancel} />;

  render() {
    const { handleDelete, handleSuccess, updateUser, user } = this.props;
    const { email, firstName, id, lastName, middleInitial, phone, username } = user;

    return (
      <RequestForm
        initialValues={{
          email,
          firstName,
          id,
          lastName,
          middleInitial,
          phone: phone ? parsePhoneWithCountryCode(phone) : undefined,
          username,
        }}
        errorMessage={`There was an error trying to update ${firstName} ${lastName}`}
        render={this.renderUserForm}
        handleDeleteIconClick={handleDelete}
        headingText={`${firstName} ${lastName}`}
        onSubmitSuccess={handleSuccess}
        submit={createUserSubmitHandler(updateUser)}
        validationSchema={validationSchema}
      />
    );
  }
}

export default EditUserForm;
