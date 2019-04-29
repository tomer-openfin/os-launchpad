import * as React from 'react';

import { addWindowListener, removeWindowListener } from '../../utils/finUtils';

import SearchInput from './SearchInput';

interface Props {
  htmlInputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  name?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: number;
}

interface State {
  value: string;
}

class SearchInputWithState extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  componentDidMount() {
    // tslint:disable-next-line:no-console
    addWindowListener()('hidden', this.clearInputField).catch(e => console.warn('Caught error attaching hidden listener:', e));
  }

  componentWillUnmount() {
    // tslint:disable-next-line:no-console
    removeWindowListener()('hidden', this.clearInputField).catch(e => console.warn('Caught error removing hidden listener:', e));
  }

  clearInputField = () => {
    this.setState({ value: '' });
  };

  componentDidUpdate(_: Props, prevState: State) {
    const { onChange } = this.props;
    const { value } = this.state;
    const { value: previousValue } = prevState;

    if (value !== previousValue) {
      onChange(value);
    }
  }

  handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    this.setState({ value });
  };

  handleClear = () => {
    this.setState({ value: '' });
  };

  render() {
    const { className, placeholder, width, htmlInputRef } = this.props;
    const { value } = this.state;

    return (
      <SearchInput
        htmlInputRef={htmlInputRef}
        className={className}
        name={name}
        placeholder={placeholder}
        width={width}
        value={value}
        onClear={this.handleClear}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchInputWithState;
