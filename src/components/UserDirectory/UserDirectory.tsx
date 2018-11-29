import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Modal from '../Modal';
import { ButtonLink, HeadingWrapper, Input, Label, LinkWrapper, ListElement, ListWrapper, Select, Wrapper } from './UserDirectory.css';

import { User } from '../../types/commons';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { userRoutes } from '../Router';
import { ROUTES } from '../Router/consts';

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

class UserDirectory extends React.PureComponent<Props & RouteComponentProps, State> {
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
    this.props.users.filter(
      user =>
        user.firstName
          .concat(user.lastName)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1,
    );

  sortIncomingDataByLastName = data => {
    const sortedData = data.sort((a, b) => {
      const nameA = a.lastName.toUpperCase();
      const nameB = b.lastName.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return 0;
    });

    return sortedData;
  };

  renderButtons = user => {
    return (
      <LinkWrapper>
        <ButtonLink to={{ pathname: ROUTES.ADMIN_USERS_EDIT, state: user }}>Edit</ButtonLink>

        <ButtonLink to={{ pathname: ROUTES.ADMIN_USERS_DELETE, state: user }}>Delete</ButtonLink>
      </LinkWrapper>
    );
  };

  render() {
    const { children, history } = this.props;
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

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Add User</ButtonLink>

          <ButtonLink to={ROUTES.ADMIN_USERS_IMPORT}>Import Users</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.sortUserData(this.filterUserList(search), sort).map(user => (
            <li key={user.id}>
              <ListElement>
                {user.lastName}, {user.firstName}
              </ListElement>
              <ListElement>{user.email}</ListElement>
              <ListElement>Admin: {user.isAdmin ? 'Yes' : 'No'}</ListElement>
              <ListElement>{this.renderButtons(user)}</ListElement>
            </li>
          ))}
        </ListWrapper>

        {doesCurrentPathMatch(userRoutes, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
      </Wrapper>
    );
  }
}

export default UserDirectory;
