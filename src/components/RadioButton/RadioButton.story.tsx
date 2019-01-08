import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import RadioButton from './RadioButton';

interface Props {
  children: (value: string, onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void) => React.ReactNode;
  defaultValue: string;
}

interface State {
  value: string;
}

class RadioButtonsStory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.defaultValue,
    };
  }

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({ value });
  };

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return <div>{children(value, this.onChange)}</div>;
  }
}

storiesOf(`${CATEGORIES.UI}RadioButton`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const label = text('label', 'On');
    const checked = boolean('checked', false);

    return (
      <RadioButton checked={checked} name="onoff" value="on">
        {label}
      </RadioButton>
    );
  })
  .add('as group', () => {
    return (
      <RadioButtonsStory defaultValue="on">
        {(value, onChange) => (
          <>
            <RadioButton checked={value === 'on'} name="onoff" onChange={onChange} value="on">
              On
            </RadioButton>

            <RadioButton checked={value === 'off'} name="onoff" onChange={onChange} value="off">
              Off
            </RadioButton>
          </>
        )}
      </RadioButtonsStory>
    );
  });
