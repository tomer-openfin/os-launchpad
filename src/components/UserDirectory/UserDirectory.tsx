import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  ButtonLink,
  DeleteIconLink,
  EditIconLink,
  Footer,
  HeadingWrapper,
  Input,
  InputWrapper,
  LinkWrapper,
  ListWrapper,
  SortButton,
  SortHeader,
  SortWrapper,
  Wrapper,
} from './UserDirectory.css';

import { User } from '../../types/commons';

import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { userRoutes } from '../Router';
import { ROUTES } from '../Router/consts';

import { Row } from '../AppDirectory';
import Modal from '../Modal';
import UserCard from '../UserCard';

const SORT_VALUES = {
  'Admin': 'isAdmin',
  'Email': 'email',
  'First Name': 'firstName',
  'Last Name': 'lastName',
};

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
      sort: SORT_VALUES['Last Name'],
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
          <InputWrapper>
            <Input name="search" value={search} onChange={this.handleInputChange} placeholder="Filter Users" type="text" />
          </InputWrapper>

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Add User</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.sortUserData(this.filterUserList(search), sort).map(user => (
            <Row key={user.id}>
              <UserCard user={user} ctas={this.renderButtons(user)} />
            </Row>
          ))}
        </ListWrapper>

        {doesCurrentPathMatch(userRoutes, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}

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

export default UserDirectory;
