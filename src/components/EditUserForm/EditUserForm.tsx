import * as React from 'react';

import { MetaWithCallbacks, PushRoute, RequestFormSubmit, User } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import RequestForm from '../RequestForm';
import UserForm from '../UserForm';

interface Props {
  onEscDown: () => void;
  updateUser: RequestFormSubmit<User>;
  user: User;
  pushRoute: PushRoute;
}

const parsePhoneWithCountryCode = (phoneNumber: string) => phoneNumber.substr(phoneNumber.length - 10);

const createUserSubmitHandler = (submitUser: RequestFormSubmit<User>): RequestFormSubmit<User> => (formData: User, meta: MetaWithCallbacks) => {
  // default to +1 for country code for now
  const payload: User = { ...formData, phone: `+1${formData.phone}` };

  submitUser(payload, meta);
};

const EditUserForm = ({ user, pushRoute, updateUser }: Props) => {
  const { firstName, lastName, middleInitial, phone, id, username, email } = user;

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
      form={UserForm}
      handleDeleteIconClick={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS_DELETE, user)}
      headingText={`${firstName} ${lastName}`}
      onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS)}
      submit={createUserSubmitHandler(updateUser)}
    />
  );
};

export default EditUserForm;
