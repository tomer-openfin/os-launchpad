import * as React from 'react';
import * as Yup from 'yup';

import { DispatchRequest, MetaWithCallbacks, PushRoute, User } from '../../types/commons';

import { createPushRouteHandler } from '../../utils/routeHelpers';
import { ROUTES } from '../Router/consts';

import RequestForm from '../RequestForm';
import UserForm, { baseSchema } from '../UserForm';

interface Props {
  onEscDown: () => void;
  updateUser: DispatchRequest<User>;
  user: User;
  pushRoute: PushRoute;
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

const EditUserForm = ({ user, pushRoute, updateUser }: Props) => {
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
      render={UserForm}
      handleDeleteIconClick={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS_DELETE, user)}
      headingText={`${firstName} ${lastName}`}
      onSubmitSuccess={createPushRouteHandler(pushRoute, ROUTES.ADMIN_USERS)}
      submit={createUserSubmitHandler(updateUser)}
      validationSchema={validationSchema}
    />
  );
};

export default EditUserForm;
