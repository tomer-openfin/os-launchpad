import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DeleteIconLink, EditIconLink, Footer, HeadingWrapper, LinkWrapper, ListWrapper, SortButton, SortHeader, SortWrapper, Wrapper } from './AdminUsers.css';

import { User } from '../../types/commons';

import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ADMIN_USERS_ROUTES, ROUTES } from '../Router/consts';

import { Row } from '../AppDirectory';
import { ButtonLink } from '../Button';
import Modal from '../Modal';
import { SearchInputWithState } from '../SearchInput';
import UserCard from '../UserCard';

const ADMIN_USERS_PATHS = Object.values(ADMIN_USERS_ROUTES);

const SORT_VALUES = {
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
  sort: string;
}

const defaultProps: Partial<Props> = {
  users: [],
};

class AdminUsers extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      sort: SORT_VALUES['Last Name'],
    };
  }

  handleInputChange = (search: string) => {
    this.setState({ search });
  };

  handleChangeSortCreator = sort => () => {
    this.setState({ sort });
  };

  // TODO: only sort on sort change and props update instead of every render,
  // store derived (sorted) state to filter in render
  sortUserData = (userData: User[], sortKey: string) =>
    userData.sort((userA, userB) => {
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

  renderButtons = user => {
    return (
      <LinkWrapper>
        <EditIconLink to={{ pathname: ROUTES.ADMIN_USERS_EDIT, state: user }} />

        <DeleteIconLink to={{ pathname: ROUTES.ADMIN_USERS_DELETE, state: user }} />
      </LinkWrapper>
    );
  };

  render() {
    const { children, history } = this.props;
    const { search, sort } = this.state;

    return (
      <Wrapper>
        <HeadingWrapper>
          <SearchInputWithState name="search" placeholder="Filter Users" onChange={this.handleInputChange} />

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Add User</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.sortUserData(this.filterUserList(search), sort).map(user => (
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
