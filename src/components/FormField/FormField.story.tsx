import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import noop from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import FormField from './FormField';
import { LABEL_TRANSITION_CLASSNAMES, LABEL_TRANSITION_DURATION } from './FormField.css';

const renderEmailField = ({ isSubmitting, isValid }) => (
  <FormField type={'text'} name={'email'} validate={noop} placeholder={'Enter Email'} disabled={false} label={'Email'} />
);
const renderPasswordField = ({ isSubmitting, isValid }) => (
  <FormField type={'password'} name={'password'} validate={noop} placeholder={'Enter Password'} disabled={false} label={'Password'} />
);
const renderTextAreaField = ({ isSubmitting, isValid }) => (
  <FormField type={'text'} component="textarea" name={'description'} validate={noop} placeholder={'Enter Description'} disabled={false} label={'Description'} />
);

storiesOf(`${CATEGORIES.UI}FormField`, module)
  .addDecorator(withKnobs)
  .add('Default', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderEmailField} />)
  .add('Password', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderPasswordField} />)
  .add('Text Area', () => <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderTextAreaField} />)
  .add('withAnimation', () => {
    const isMounted = boolean('Mounted', false);

    const fields = [0, 1, 2];

    return (
      <TransitionGroup component={null}>
        {isMounted &&
          fields.map(index => (
            <CSSTransition classNames={LABEL_TRANSITION_CLASSNAMES} key={index} timeout={LABEL_TRANSITION_DURATION} unmountOnExit>
              <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderEmailField} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  });
