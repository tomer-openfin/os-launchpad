import * as React from 'react';

import debounce from 'lodash-es/debounce';
import escapeRegExp from 'lodash-es/escapeRegExp';

import { ButtonWrapper, LinkButton, ListWrapper, StyledInput, StyledSelect, Wrapper } from './';

import noop from '../../utils/noop';
import MockUserData from './MockUserData';

interface Props {
  // will GET a list from /users eventually, pass in as props
  // remove MockUserData
  listOfUsers?: {};
}

interface State {
  inputValue: string;
}

class UserDirectory extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };

    this.debouncedSearch = debounce(this.debouncedSearch, 500);
  }

  debouncedSearch = inputValue => this.setState({ inputValue });

  handleInputChange = ({ target: { value } }) => {
    // prevents re-renders from crashing due to expected regex statement
    // i.e in search box: '\' or other regex chars need to be closed \ \ to be valid
    const escapedRegexValue = escapeRegExp(value);
    const cleanString = escapedRegexValue.replace(/[\\|&;$%@"<>()+,*]/g, '');
    this.setState({ inputValue: cleanString });

    this.debouncedSearch(cleanString);
  };

  renderButtons = () => {
    // TODO: unique user id can be used to eventually pass correct props to EDIT/DELETE
    return (
      <ButtonWrapper>
        <LinkButton onClick={noop}>Edit</LinkButton>
        <LinkButton onClick={noop}>Delete</LinkButton>
      </ButtonWrapper>
    );
  };

  // tslint:disable:jsx-no-multiline-js
  render() {
    const { inputValue } = this.state;
    const regex = new RegExp(inputValue, 'i');

    return (
      <Wrapper>
        <StyledInput name="search" value={inputValue} onChange={this.handleInputChange} placeholder="Search users..." type="text" />

        {/* TODO: alphabetize by first name and last name */}
        <StyledSelect>
          <option value="sort">Sort by...</option>
          <option value="lastName">Last Name</option>
          <option value="firstName">First Name</option>
        </StyledSelect>

        <ListWrapper>
          {MockUserData.filter(user => user.lastName.match(regex)).map(user => (
            <li key={user.id}>
              {user.lastName}, {user.firstName} {this.renderButtons()}
            </li>
          ))}
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default UserDirectory;
