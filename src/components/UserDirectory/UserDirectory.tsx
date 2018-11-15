import * as React from 'react';

import debounce from 'lodash-es/debounce';
import escapeRegExp from 'lodash-es/escapeRegExp';
import { Link } from 'react-router-dom';

import { Button, HeadingWrapper, Input, Label, LinkButton, ListWrapper, Select, Wrapper } from './';

import noop from '../../utils/noop';
import { IMPORT_USERS_SUB_ROUTE, NEW_USER_SUB_ROUTE } from '../Router/const';
import MockUserData from './MockUserData';
import { LinkWrapper } from './UserDirectory.css';

interface Props {
  // will GET a list from api/admin/users eventually, pass in as props
  listOfUsers?: {};
}

interface State {
  inputValue: string;
  isSortingByLast: boolean;
  selectValue: string;
}

const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';

class UserDirectory extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      isSortingByLast: true,
      selectValue: 'lastName',
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

  handleSelectChange = ({ target: { value } }) => {
    if (value === FIRST_NAME) {
      this.setState(prevState => ({
        isSortingByLast: !prevState.isSortingByLast,
        selectValue: FIRST_NAME,
      }));
    } else {
      this.setState({ isSortingByLast: true, selectValue: LAST_NAME });
    }
  };

  sortIncomingData = data => {
    const sortedData = data.sort((a, b) => {
      const nameA = a.firstName.toUpperCase();
      const nameB = b.firstName.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return 0;
    });

    return sortedData;
  };

  renderButtons = () => {
    // TODO: unique user id can be used to eventually pass correct props to EDIT/DELETE
    return (
      <LinkWrapper>
        <LinkButton onClick={noop}>Edit</LinkButton>
        <LinkButton onClick={noop}>Delete</LinkButton>
      </LinkWrapper>
    );
  };

  // tslint:disable:jsx-no-multiline-js
  render() {
    const { inputValue, isSortingByLast, selectValue } = this.state;
    const regex = new RegExp(inputValue, 'i');

    return (
      <Wrapper>
        <HeadingWrapper>
          <Label>
            Sort by
            <Select onChange={this.handleSelectChange} value={selectValue}>
              <option value="lastName">Last Name</option>
              <option value="firstName">First Name</option>
            </Select>
          </Label>

          <Input name="search" value={inputValue} onChange={this.handleInputChange} placeholder="Search users..." type="text" />

          <Button>
            <Link to={NEW_USER_SUB_ROUTE}>Create New User</Link>
          </Button>

          <Button>
            <Link to={IMPORT_USERS_SUB_ROUTE}>Import Users</Link>
          </Button>
        </HeadingWrapper>

        <ListWrapper>
          {isSortingByLast
            ? MockUserData.filter(user => user.lastName.match(regex)).map(user => (
                <li key={user.id}>
                  {user.lastName}, {user.firstName} | {user.email} | Admin: {user.isAdmin ? 'Yes' : 'No'} | Initialized: {user.isInitialized ? 'Yes' : 'No'} |
                  Started: {user.dateStarted} {this.renderButtons()}
                </li>
              ))
            : this.sortIncomingData(MockUserData)
                .filter(user => user.firstName.match(regex))
                .map(user => (
                  <li key={user.id}>
                    {`${user.firstName} ${user.lastName}`} | {user.email} | Admin: {user.isAdmin ? 'Yes' : 'No'} | Initialized:{' '}
                    {user.isInitialized ? 'Yes' : 'No'} | Started: {user.dateStarted} {this.renderButtons()}
                  </li>
                ))}
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default UserDirectory;
