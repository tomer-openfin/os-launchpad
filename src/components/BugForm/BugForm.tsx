import * as React from 'react';

import { ButtonWrapper, Form, InputWrapper, Wrapper } from './BugForm.css';

import Color from '../../styles/color';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import { StyledButton } from '../ForgotPasswordSuccess';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import TextArea from '../TextArea';

const BUG_COPY = `Thanks for taking the time to report a bug\
during the beta program. Please provide as much detail as you\
can so we can address the issue as quickly as possible.`;

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
  handleClose: () => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  touched: Touched;
  values: Values;
}

const renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);

const BugForm = ({ className, errors, handleBlur, handleChange, handleClose, handleSubmit, isSubmitting, touched, values }: Props) => {
  return (
    <Wrapper>
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
              height={135}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={BUG_COPY}
              value={values.description}
              width="100%"
            />
          </Label>

          <Label label="Steps to reproduce" renderError={renderError(errors.steps, touched.steps)}>
            <TextArea
              hasError={!!errors.steps && touched.steps}
              height={135}
              name="steps"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.steps}
              width="100%"
            />
          </Label>
        </InputWrapper>

        <ButtonWrapper>
          <Button backgroundColor={Color.MERCURY} width={153} onClick={handleClose}>
            Cancel
          </Button>

          <StyledButton type="submit">{isSubmitting ? <Loading size={15} /> : 'Ok'}</StyledButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};

export default BugForm;
