import * as React from 'react';

import { ButtonWrapper, Form, InputWrapper, Wrapper } from './FeedbackForm.css';

import Color from '../../styles/color';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import { StyledButton } from '../ForgotPasswordSuccess';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import TextArea from '../TextArea';

const FEEDBACK_COPY = `We\'re really excited to hear what you have to say.\
 Your feedback is the most important part of the Cloud\
 Services beta program! Just write your comments in the\
 text box below and we\'ll make sure your idea is recorded and tracked.`;

interface Errors {
  subject?: string;
  productFeedback?: string;
}

interface Touched {
  subject?: boolean;
  productFeedback?: boolean;
}

export interface Values {
  subject: string;
  productFeedback: string;
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

const FeedbackForm = ({ className, errors, handleBlur, handleChange, handleClose, handleSubmit, isSubmitting, touched, values }: Props) => {
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

          <Label label="Product Feedback" renderError={renderError(errors.productFeedback, touched.productFeedback)}>
            <TextArea
              hasError={!!errors.productFeedback && touched.productFeedback}
              height={135}
              name="productFeedback"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={FEEDBACK_COPY}
              value={values.productFeedback}
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

export default FeedbackForm;
