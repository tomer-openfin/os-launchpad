import * as React from 'react';

import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import Label from '../Label';
import Loading from '../Loading';
import { ButtonWrapper, Form, InputWrapper } from '../Support/Support.css';
import TextArea from '../TextArea';

const FEEDBACK_COPY = 'Write your feedback here.';

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
  handleCancel: () => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  touched: Touched;
  values: Values;
}

const renderError = (error: string | undefined, touched?: boolean) => (error && touched ? () => <ErrorMessage>{error}</ErrorMessage> : undefined);

const FeedbackForm = ({ className, errors, handleBlur, handleChange, handleCancel, handleSubmit, isSubmitting, touched, values }: Props) => {
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
        <Button width={305} type="submit">
          {isSubmitting ? <Loading size={15} /> : 'Submit'}
        </Button>
      </ButtonWrapper>
    </Form>
  );
};

export default FeedbackForm;
