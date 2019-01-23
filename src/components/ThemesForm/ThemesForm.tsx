import { Field, FieldProps, Form, Formik, FormikHandlers, FormikProps } from 'formik';
import * as React from 'react';

import { MetaWithCallbacks, Theme } from '../../types/commons';

import { Color } from '../../styles/index';
import Button from '../Button';
import { ButtonsWrapper, StyledForm } from '../LogoForm/index';
import { Option, Select } from './ThemesForm.css';

const BASE_ID = 'ThemesForm';
const SELECT_ID = `${BASE_ID}SelectInput`;

enum FormNames {
  Theme = 'theme',
}

interface FormikInitialValues {
  [FormNames.Theme]: Theme['id'];
}

interface Props {
  themes: Theme[];
  activeThemeId: Theme['id'];
  setOrgActiveThemeId: (themeId: Theme['id']) => void;
  saveOrgActiveThemeId: (themeId: Theme['id'], meta?: MetaWithCallbacks) => void;
}

interface State {
  currentThemeId: string;
  loading: boolean;
}

class ThemesForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentThemeId: props.activeThemeId,
      loading: false,
    };
  }

  componentWillUnmount() {
    this.handleResetProps();
  }

  createHandleSelectChange = (fn: FormikHandlers['handleChange']) => (e: React.SyntheticEvent<HTMLSelectElement>) => {
    // Execute Formik default handleChange functionality
    fn(e);

    const { themes, setOrgActiveThemeId } = this.props;
    // But as a side effect, set selected theme in redux
    // so admin can see a preview of selected theme
    const selectedTheme = themes.find(theme => theme.id === e.currentTarget.value);

    if (selectedTheme) {
      setOrgActiveThemeId(selectedTheme.id);
    }
  };

  handleSubmit = () => {
    const { activeThemeId, saveOrgActiveThemeId } = this.props;

    const successCb = () => {
      this.setState({
        currentThemeId: activeThemeId,
        loading: false,
      });
    };
    const meta = { successCb };

    this.setState(
      {
        loading: true,
      },
      () => saveOrgActiveThemeId(activeThemeId, meta),
    );
  };

  handleReset = (fn: FormikHandlers['handleReset']) => () => {
    // Execute Formik default handleReset functionality
    fn();

    // But also reset custom side effects needed in redux and state
    this.handleResetProps();
  };

  handleResetProps = () => {
    const { setOrgActiveThemeId, activeThemeId } = this.props;

    if (this.state.currentThemeId !== activeThemeId) {
      setOrgActiveThemeId(this.state.currentThemeId);
    }
  };

  renderSelectInput = ({ field }: FieldProps) => {
    const { themes } = this.props;
    const { loading } = this.state;

    return (
      <Select {...field} id={SELECT_ID} onChange={this.createHandleSelectChange(field.onChange)} placeholder="Select Theme..." disabled={loading}>
        {themes.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    );
  };

  renderForm = (formikProps: FormikProps<FormikInitialValues>) => {
    const { loading } = this.state;

    return (
      <StyledForm>
        <Field name={FormNames.Theme} render={this.renderSelectInput} />

        <ButtonsWrapper>
          <Button disabled={!formikProps.dirty || loading} isDark type="submit" width={110}>
            Set Theme
          </Button>

          <Button
            disabled={!formikProps.dirty || loading}
            onClick={this.handleReset(formikProps.handleReset)}
            type="button"
            width={110}
            backgroundColor={Color.MARS}
          >
            Reset
          </Button>
        </ButtonsWrapper>
      </StyledForm>
    );
  };

  render() {
    return (
      <Formik
        initialValues={{
          [FormNames.Theme]: this.state.currentThemeId,
        }}
        key={this.state.currentThemeId}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default ThemesForm;
