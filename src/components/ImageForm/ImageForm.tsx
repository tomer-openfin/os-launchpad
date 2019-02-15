import { Formik, FormikHandlers } from 'formik';
import * as React from 'react';

import Color from '../../styles/color';

import { loadFile } from '../../utils/loadFile';

import ErrorMessage from '../ErrorMessage';
import ImageInput from '../ImageInput';
import Input from '../Input';
import Label from '../Label';
import ResponsiveForm from '../ResponsiveForm';

const BASE_ID = 'ImageForm';
const FILE_INPUT_ID = `${BASE_ID}FileInput`;
const FILE_ACCEPT = 'image/*';

enum FormNames {
  imgSrc = 'imgSrc',
}

interface FormikInitialValues {
  [FormNames.imgSrc]: string;
}

interface Props {
  byUrl: boolean;
  saveImage: (image: string) => void;
  handleCancel: () => void;
}

interface State {
  file: File | null;
  fileUrl: string;
}

class ImageForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      file: null,
      fileUrl: '',
    };
  }

  componentWillUnmount() {
    this.handleResetFileUrl();
  }

  handleSubmit = (values, actions) => {
    const { saveImage, byUrl } = this.props;

    if (byUrl) {
      saveImage(values.imgSrc);

      actions.setSubmitting(false);

      return;
    }

    const { file } = this.state;

    if (!file) {
      return;
    }

    loadFile(file, result => {
      if (typeof result === 'string') {
        saveImage(result);
      }

      actions.setSubmitting(false);
    });
  };

  handleFileChange = (formikHandleChange: FormikHandlers['handleChange']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // Must pass checks to change file input
    // 1 - Files must exist
    // 2 - Must have at least 1 file
    // 3 - First file must pass accepted file type
    if (!files || !files.length || files[0].type.indexOf(FILE_ACCEPT.replace('*', '')) !== 0) {
      return;
    }

    // Execute Formik default handleChange functionality
    formikHandleChange(e);

    // Formik does not keep file objects
    // So we must add in additonal logic to the default
    // to handle this case with local state
    const file = files[0];

    this.handleResetFileUrl();

    const newFileUrl = URL.createObjectURL(file);

    this.setState({ file, fileUrl: newFileUrl });
  };

  handleResetFileUrl = () => {
    const { fileUrl } = this.state;

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
  };

  renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);

  renderForm = ({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => {
    const { byUrl, handleCancel } = this.props;
    const { fileUrl } = this.state;

    return (
      <ResponsiveForm
        isSubmitting={isSubmitting}
        submitDisabled={isSubmitting || (!values[FormNames.imgSrc] && !fileUrl)}
        handleCancel={handleCancel}
        footerColor={Color.VOID}
      >
        {byUrl ? (
          <Label label="Image URL" renderError={this.renderError(errors.newPassword, touched.newPassword)}>
            <Input
              hasError={!!errors.newPassword && touched.newPassword}
              name={FormNames.imgSrc}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter URL of Image"
              type="text"
              value={values.imgSrc}
            />
          </Label>
        ) : (
          <Label label="" htmlFor={FILE_INPUT_ID}>
            <ImageInput fileInputId={FILE_INPUT_ID} imgSrc={fileUrl} name={FormNames.imgSrc} handleFileChange={this.handleFileChange(handleChange)} />
          </Label>
        )}
      </ResponsiveForm>
    );
  };

  render() {
    const { fileUrl } = this.state;

    const initialValues: FormikInitialValues = {
      [FormNames.imgSrc]: '',
    };

    return <Formik initialValues={initialValues} key={fileUrl} onSubmit={this.handleSubmit} render={this.renderForm} />;
  }
}

export default ImageForm;
