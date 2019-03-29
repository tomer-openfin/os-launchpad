import * as React from 'react';

import Button from '../Button';
import { ButtonWrapper, Form, InputWrapper } from './BugForm.css';

import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import TextArea from '../TextArea';

const BUG_DESCRIPTION_COPY = 'Write a short description of the issue you\'re experiencing.';
const BUG_STEPS_COPY = 'Write reproduction steps for the issue you\'re experiencing.';

interface Errors {
  subject?: string;
  description?: string;
  steps?: string;
}

interface Touched {
  subject?: boolean;
  description?: boolean;
  steps?: boolean;
}

export interface Values {
  subject: string;
  description: string;
  steps: string;
}

interface Props {
  className?: string;
  errors: Errors;
  handleBlur: (e: React.FocusEvent) => void;
  handleChange: (e: React.ChangeEvent) => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  touched: Touched;
  values: Values;
}

const renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);

const BugForm = ({ className, errors, handleBlur, handleChange, handleCancel, handleSubmit, isSubmitting, touched, values }: Props) => {
  return (
    <Form className={className} onSubmit={handleSubmit}>
      <InputWrapper>
        <Label label="Subject" renderError={renderError(errors.subject, touched.subject)}>
          <Input
            hasError={!!errors.subject && touched.subject}
            name="subject"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Subject"
            type="text"
            value={values.subject}
          />
        </Label>

        <Label label="Description" renderError={renderError(errors.description, touched.description)}>
          <TextArea
            hasError={!!errors.description && touched.description}
            height={75}
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={BUG_DESCRIPTION_COPY}
            value={values.description}
            width="100%"
          />
        </Label>

        <Label label="Steps to reproduce" renderError={renderError(errors.steps, touched.steps)}>
          <TextArea
            hasError={!!errors.steps && touched.steps}
            height={75}
            name="steps"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={BUG_STEPS_COPY}
            value={values.steps}
            width="100%"
          />
        </Label>
      </InputWrapper>

      <ButtonWrapper>
        <Button width={305} type="submit">
          {isSubmitting ? <Loading size={15} /> : 'Submit'}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default BugForm;
