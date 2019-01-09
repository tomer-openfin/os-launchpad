import * as React from 'react';

import * as refreshIcon from '../../assets/Refresh.svg';

import { MOCK_CONTEXTS, MOCK_INTENTS } from '../../samples/FDC3';
import { ROUTES } from '../Router/consts';

import { validateTextField, validateURL } from '../../utils/validators';

import { Color } from '../../styles';
import Button, { ButtonLink } from '../Button/Button.css';
import { ButtonWrapper, CheckboxWrapper, Footer, FormWrapper, GridWrapper, RefreshIconWrapper, RowWrapper, ScrollWrapper } from '../UserForm';

import Checkbox from '../Checkbox';
import FormField, { Label, LabelText } from '../FormField';
import SvgIcon from '../SvgIcon/SvgIcon';

const renderMockIntents = () => MOCK_INTENTS.map((intent, index) => <Checkbox name="intents" key={index} value={intent.displayName} />);

const renderMockContexts = () => MOCK_CONTEXTS.map((context, index) => <Checkbox name="contexts" key={index} value={context.$type} />);

const AppForm = ({ isValid, isSubmitting }) => (
  <FormWrapper>
    <ScrollWrapper>
      <GridWrapper>
        <RowWrapper secondElementWidth="33px">
          <FormField label="Manifest URL" type="text" name="manifest_url" validate={validateURL} placeholder="Enter manifest url" />

          <RefreshIconWrapper>
            <SvgIcon color={Color.JUPITER} hoverColor={Color.JUPITER} imgSrc={refreshIcon} size={40} />
          </RefreshIconWrapper>
        </RowWrapper>

        <FormField label="App Title" type="text" name="title" validate={validateTextField} placeholder="Enter app title" />

        <RowWrapper height="99px">
          <FormField label="Description" type="text" component="textarea" name="description" validate={validateTextField} placeholder="Enter description" />

          <FormField label="App Icon URL" type="text" name="icon" validate={validateURL} placeholder="Enter app icon url" />
        </RowWrapper>

        <RowWrapper height="161px">
          <Label>
            <LabelText>Accepted Intent(s)</LabelText>

            <CheckboxWrapper>{renderMockIntents()}</CheckboxWrapper>
          </Label>

          <Label>
            <LabelText>Accepted Context(s)</LabelText>

            <CheckboxWrapper>{renderMockContexts()}</CheckboxWrapper>
          </Label>
        </RowWrapper>
      </GridWrapper>
    </ScrollWrapper>

    <Footer>
      <ButtonWrapper>
        <ButtonLink to={ROUTES.ADMIN_APPS} backgroundColor={Color.MERCURY} type="button" width={128}>
          Cancel
        </ButtonLink>

        <Button type="submit" width={128} disabled={isSubmitting || !isValid}>
          Save
        </Button>
      </ButtonWrapper>
    </Footer>
  </FormWrapper>
);

export default AppForm;