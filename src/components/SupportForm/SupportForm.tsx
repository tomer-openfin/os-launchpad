import * as React from 'react';

import { ButtonWrapper, InputWrapper, Wrapper } from './SupportForm.css';

import Color from '../../styles/color';
import Button from '../Button/index';
import Label from '../Label/index';
import TextArea from '../TextArea/index';

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  inputValue: string;
}
const SupportForm = ({ handleClose, handleSubmit, handleChange, inputValue }: Props) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Label label="Support Category" />

        <select />
      </InputWrapper>

      <InputWrapper>
        <Label label="Describe your issue" />

        <TextArea value={inputValue} handleChange={handleChange} placeholder="Write a short description of the issue you're experiencing" />
      </InputWrapper>

      <ButtonWrapper>
        <Button backgroundColor={Color.MERCURY} width={153} onClick={handleClose}>
          Cancel
        </Button>

        <Button width={153} onClick={handleSubmit}>
          Submit
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SupportForm;
