import { Field, FieldProps, Form, Formik, FormikHandlers, FormikProps } from 'formik';
import * as React from 'react';

import { Theme } from '../../redux/types';
import { saveTheme } from '../../services/ApiService';

import { InputWrapper, Label, Select, StyledButton, Wrapper } from './ThemesForm.css';

const BASE_ID = 'ThemesForm';
const SELECT_ID = `${BASE_ID}SelectInput`;

enum FormNames {
  Theme = 'theme',
}

interface FormikInitialValues {
  [FormNames.Theme]: string;
}

interface Props {
  themes: Theme[];
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

class ThemesForm extends React.PureComponent<Props> {
  currentTheme: Theme;

  constructor(props: Props) {
    super(props);

    this.currentTheme = props.theme;
  }

  componentWillUnmount() {
    this.handleResetProps();
  }

  createHandleSelectChange = (fn: FormikHandlers['handleChange']) => (e: React.SyntheticEvent<HTMLSelectElement>) => {
    // Execute Formik default handleChange functionality
    fn(e);

    const { themes, setTheme } = this.props;
    // But as a side effect, set selected theme in redux
    // so admin can see a preview of selected theme
    const selectedTheme = themes.find(theme => theme.id === e.currentTarget.value);
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };

  handleSubmit = () => {
    const { theme } = this.props;

    saveTheme(theme)
      .then(() => {
        this.currentTheme = theme;
        this.forceUpdate();
      })
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.log('Error saving logo:', e);
      });
  };

  handleReset = (fn: FormikHandlers['handleReset']) => () => {
    // Execute Formik default handleReset functionality
    fn();

    // But also reset custom side effects needed in redux and state
    this.handleResetProps();
  };

  handleResetProps = () => {
    const { setTheme, theme } = this.props;

    if (this.currentTheme !== theme) {
      setTheme(this.currentTheme);
    }
  };

  renderSelectInput = ({ field }: FieldProps) => {
    const { themes } = this.props;
    return (
      <Select {...field} id={SELECT_ID} onChange={this.createHandleSelectChange(field.onChange)} placeholder="Select Theme...">
        {themes.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
    );
  };

  renderForm = (formikProps: FormikProps<FormikInitialValues>) => {
    return (
      <Form>
        <InputWrapper>
          <Label>Choose theme to set appearance of App Launcher and accompanying windows:</Label>

          <Field name={FormNames.Theme} render={this.renderSelectInput} />
        </InputWrapper>

        <StyledButton disabled={!formikProps.dirty} onClick={this.handleReset(formikProps.handleReset)} type="button" width={120}>
          Cancel
        </StyledButton>

        <StyledButton disabled={!formikProps.dirty} isDark type="submit" width={120}>
          Set Theme
        </StyledButton>
      </Form>
    );
  };

  render() {
    return (
      <Wrapper>
        <Formik
          initialValues={{
            [FormNames.Theme]: this.currentTheme.id,
          }}
          key={this.currentTheme.id}
          onSubmit={this.handleSubmit}
          render={this.renderForm}
        />
      </Wrapper>
    );
  }
}

export default ThemesForm;
