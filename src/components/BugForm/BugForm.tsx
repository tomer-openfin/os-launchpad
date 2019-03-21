import * as React from 'react';

import { ButtonWrapper, InputWrapper, Wrapper } from './BugForm.css';

import Color from '../../styles/color';
import Button from '../Button';
import Label from '../Label';
import TextArea from '../TextArea';

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
  handleChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  inputValue: string;
}
const BugForm = ({ handleClose, handleSubmit, handleChange, inputValue }: Props) => {
  return (
    <Wrapper>
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

export default BugForm;
