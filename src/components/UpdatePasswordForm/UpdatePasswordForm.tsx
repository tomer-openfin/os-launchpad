import { FormikActions, FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { UpdatePasswordRequestPayload } from '../../redux/me/types';
import { DispatchRequest, MetaWithCallbacks } from '../../types/commons';

import { Wrapper } from './UpdatePasswordForm.css';

import Borders from '../Borders';
import ConfirmPasswordUpdate from '../ConfirmPasswordUpdate';
import PasswordForm from '../PasswordForm';
import RequestForm from '../RequestForm';

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
  newPassword: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface UpdatePasswordPayload extends UpdatePasswordRequestPayload {
  confirmPassword: string;
}

interface Props {
  handleCancel?: () => void;
  handleConfirm?: () => void;
  handleSuccess?: () => void;
  updatePassword: DispatchRequest<UpdatePasswordRequestPayload>;
}

interface State {
  showPasswordForm: boolean;
}

class UpdatePasswordForm extends React.Component<Props, State> {
  state = {
    showPasswordForm: true,
  };

  onSubmitSuccess = () => {
    const { handleConfirm } = this.props;

    this.setState(
      {
        showPasswordForm: false,
      },
      handleConfirm,
    );
  };

  handleFormSubmit = (payload: UpdatePasswordPayload, meta: MetaWithCallbacks, actions: FormikActions<{}>) => {
    const { updatePassword } = this.props;

    if (payload.newPassword !== payload.confirmPassword) {
      actions.setFieldError('confirmPassword', 'Your new password and confirmation password do not match.');
      actions.setSubmitting(false);
      return;
    }

    const { confirmPassword, ...payloadCopy } = payload;

    // submit POST request
    updatePassword(payloadCopy, meta);
  };

  renderPasswordFormWindow = () => {
    const { handleCancel } = this.props;

    const renderPasswordForm = (formikProps: FormikProps<FormikValues>) => <PasswordForm {...formikProps} handleCancel={handleCancel} />;

    return (
      <Wrapper>
        <Borders height="100%" width="100%">
          <RequestForm
            initialValues={{
              confirmPassword: '',
              newPassword: '',
              password: '',
            }}
            headingText="Update Password"
            errorMessage={`Sorry, there was an error trying to update your password`}
            submit={this.handleFormSubmit}
            onSubmitSuccess={this.onSubmitSuccess}
            render={renderPasswordForm}
            validationSchema={validationSchema}
          />
        </Borders>
      </Wrapper>
    );
  };

  render() {
    const { handleSuccess } = this.props;
    const { showPasswordForm } = this.state;

    return showPasswordForm ? this.renderPasswordFormWindow() : <ConfirmPasswordUpdate handleSuccess={handleSuccess} />;
  }
}

export default UpdatePasswordForm;
