import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DeleteIconLink, EditIconLink, Footer, HeadingWrapper, LinkWrapper, ListWrapper, SortButton, SortHeader, SortWrapper, Wrapper } from './AdminUsers.css';

import { User } from '../../types/commons';

import { memoizeOneInvalidateOnOtherArgs, memoizeSort } from '../../utils/memoize';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ADMIN_USERS_ROUTES, ROUTES } from '../Router/consts';

import { Row } from '../AppDirectory';
import { ButtonLink } from '../Button';
import Modal from '../Modal';
import { SearchInputWithState } from '../SearchInput';
import UserCard from '../UserCard';

const ADMIN_USERS_PATHS = Object.values(ADMIN_USERS_ROUTES);

const SORT_VALUES: { [keys: string]: keyof User } = {
  ['Admin']: 'isAdmin',
  ['Email']: 'email',
  ['First Name']: 'firstName',
  ['Last Name']: 'lastName',
};

interface Props extends RouteComponentProps {
  users: User[];
}

interface State {
  search: string;
  sort: keyof User;
}

const defaultState: State = {
  search: '',
  sort: SORT_VALUES['Last Name'],
};

const defaultProps: Partial<Props> = {
  users: [],
};

const filterUserList = memoizeOneInvalidateOnOtherArgs((search: State['search'], users: User[]) =>
  search
    ? users.filter(
        user =>
          user.firstName
            .concat(user.lastName)
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1,
      )
    : users,
);

const sortUserDatum = (sortKey: keyof User) => (userA: User, userB: User): 1 | -1 | 0 => {
  let A = userA[sortKey];
  let B = userB[sortKey];

  if (typeof A === 'string' && typeof B === 'string') {
    A = A.toUpperCase();
    B = B.toUpperCase();

    if (A < B) return -1;
    if (A > B) return 1;
  } else if (typeof A === 'boolean' && typeof B === 'boolean') {
    if (A > B) return -1;
    if (A < B) return 1;
  }

  if (sortKey !== defaultState.sort) {
    return defaultSort(userA, userB);
  }

  return 0;
};

const defaultSort = sortUserDatum(defaultState.sort);

class AdminUsers extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  sortUserData = memoizeSort((userData: User[], sortKey: keyof User): User[] => userData.slice().sort(sortUserDatum(sortKey)));

  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  handleInputChange = (search: State['search']) => {
    this.setState({ search });
  };

  handleChangeSortCreator = (sort: State['sort']) => () => {
    this.setState({ sort });
  };

  // TODO: only sort on sort change and props update instead of every render,
  // store derived (sorted) state to filter in render

  renderButtons = (user: User) => {
    return (
      <LinkWrapper>
        <EditIconLink to={{ pathname: ROUTES.ADMIN_USERS_EDIT, state: user }} />

        <DeleteIconLink to={{ pathname: ROUTES.ADMIN_USERS_DELETE, state: user }} />
      </LinkWrapper>
    );
  };

  render() {
    const { children, history, users } = this.props;
    const { search, sort } = this.state;

    const sortedUsers = this.sortUserData(users, sort);

    return (
      <Wrapper>
        <HeadingWrapper>
          <SearchInputWithState name="search" placeholder="Filter Users" onChange={this.handleInputChange} />

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Add User</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {filterUserList(search, sortedUsers).map(user => (
            <Row key={user.id}>
              <UserCard user={user} ctas={this.renderButtons(user)} />
            </Row>
          ))}
        </ListWrapper>

        {doesCurrentPathMatch(ADMIN_USERS_PATHS, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}

        <Footer>
          <SortWrapper>
            <SortHeader>SORT BY:</SortHeader>

            {Object.keys(SORT_VALUES).map(display => (
              <SortButton key={display} active={sort === SORT_VALUES[display]} onClick={this.handleChangeSortCreator(SORT_VALUES[display])}>
                {display}
              </SortButton>
            ))}
          </SortWrapper>
        </Footer>
      </Wrapper>
    );
  }
}

export default AdminUsers;
