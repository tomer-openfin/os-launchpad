import * as React from 'react';

import { ButtonLink, HeadingWrapper, Input, Label, LinkButton, LinkWrapper, ListElement, ListWrapper, Select, Wrapper } from './UserDirectory.css';

import { User } from '../../types/commons';

import noop from '../../utils/noop';
import ROUTES from '../Router/const';

const FIRST_NAME = 'firstName';
const LAST_NAME = 'lastName';

interface Props {
  users: User[];
}

interface State {
  search: string;
  sort: string;
}

const defaultProps: Props = {
  users: [],
};

class UserDirectory extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sort: LAST_NAME,
    };
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (!currentTarget) return;
    const { value } = currentTarget;
    if (typeof value !== 'string') return;

    const search = value;

    this.setState({ search });
  };

  handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { currentTarget } = e;
    if (!currentTarget) return;
    const { value } = currentTarget;
    if (typeof value !== 'string') return;

    const sort = value;

    this.setState({ sort });
  };

  // TODO: only sort on sort change and props update instead of every render,
  // store derived (sorted) state to filter in render
  sortUserData = (userData: User[], sortKey: string) =>
    userData.sort((userA, userB) => {
      const A = userA[sortKey];
      const B = userB[sortKey];

      if (A < B) return -1;
      if (A > B) return 1;

      return 0;
    });

  filterUserList = search =>
    this.props.users.filter(user =>
      user.firstName
        .concat(user.lastName)
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1);

  renderButtons = () => {
    // TODO: unique user id can be used to eventually pass correct props to EDIT/DELETE
    return (
      <LinkWrapper>
        <LinkButton onClick={noop}>Edit</LinkButton>
        <LinkButton onClick={noop}>Delete</LinkButton>
      </LinkWrapper>
    );
  };

  render() {
    const { search, sort } = this.state;

    return (
      <Wrapper>
        <HeadingWrapper>
          <Label>
            Sort by
            <Select onChange={this.handleSelectChange} value={sort}>
              <option value={LAST_NAME}>Last Name</option>
              <option value={FIRST_NAME}>First Name</option>
            </Select>
          </Label>

          <Input name="search" value={search} onChange={this.handleInputChange} placeholder="Search users..." type="text" />

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Create New User</ButtonLink>

          <ButtonLink to={ROUTES.ADMIN_USERS_IMPORT}>Import Users</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.sortUserData(this.filterUserList(search), sort).map(user => (
            <li key={user.id}>
              <ListElement>{user.lastName}, {user.firstName}</ListElement>
              <ListElement>{user.email}</ListElement>
              <ListElement>Admin: {user.isAdmin ? 'Yes' : 'No'}</ListElement>
              <ListElement>{this.renderButtons()}</ListElement>
            </li>
          ))}
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default UserDirectory;
