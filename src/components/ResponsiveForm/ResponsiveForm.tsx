import * as React from 'react';

import { Color } from '../../styles';
import Button, { ButtonLink } from '../Button';
import { ButtonWrapper, Footer, FormWrapper, GridWrapper, ScrollWrapper } from './ResponsiveForm.css';

interface Props {
  buttonWidths?: number;
  children: React.ReactNode;
  parentRoute: string;
  submitDisabled: boolean;
}

export const ResponsiveForm = ({ children, parentRoute, submitDisabled, buttonWidths = 128 }: Props) => (
  <FormWrapper>
    <ScrollWrapper>
      <GridWrapper>{children}</GridWrapper>
    </ScrollWrapper>

    <Footer>
      <ButtonWrapper>
        <Button type="submit" width={buttonWidths} disabled={submitDisabled}>
          Save
        </Button>

        <ButtonLink to={parentRoute} backgroundColor={Color.MERCURY} type="button" width={buttonWidths}>
          Cancel
        </ButtonLink>
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default ResponsiveForm;
