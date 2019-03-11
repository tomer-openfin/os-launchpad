import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import {
  AddEditWrapper,
  DeleteIconLink,
  EditIconLink,
  Footer,
  HeadingWrapper,
  LinkWrapper,
  ListWrapper,
  SortButton,
  SortHeader,
  SortWrapper,
  Wrapper,
} from './AdminUsers.css';

import { User } from '../../types/commons';
import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import { memoizeSort } from '../../utils/memoize';
import noop from '../../utils/noop';
import { ROUTES } from '../Router/consts';

import { Row } from '../AppDirectory';
import { ButtonLink } from '../Button';
import ConfirmUserDelete from '../ConfirmUserDelete';
import EditUserForm from '../EditUserForm';
import Modal from '../Modal';
import NewUserForm from '../NewUserForm';
import { SearchInputWithState } from '../SearchInput';
import UserCard from '../UserCard';
import { filterUserList, sortUserDatum } from './helpers';

export enum Stage {
  Default = 'default',
  Delete = 'delete',
  Edit = 'edit',
  New = 'new',
}

export interface Props {
  currentAction?: string;
  handleClose?: () => void;
  handleDelete?: () => void;
  id?: string;
  users?: User[];
}

export interface State {
  search: string;
  sort: keyof User;
}

const SORT_VALUES: { [keys: string]: keyof User } = {
  ['Admin']: 'isAdmin',
  ['Email']: 'email',
  ['First Name']: 'firstName',
  ['Last Name']: 'lastName',
};

export const defaultSortKey = SORT_VALUES['Last Name'];

export const defaultState: State = {
  search: '',
  sort: SORT_VALUES['Last Name'],
};

const defaultProps: Partial<Props> = {
  users: [],
};

class AdminUsers extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  sortUserData = memoizeSort((userData: User[], sortKey: keyof User): User[] => userData.slice().sort(sortUserDatum(sortKey)));

  constructor(props: Props) {
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

  renderButtons = (user: User) => (
    <LinkWrapper>
      <EditIconLink to={`${ROUTES.ADMIN_USERS_EDIT}${user.id}`} />

      <DeleteIconLink to={`${ROUTES.ADMIN_USERS_DELETE}${user.id}`} />
    </LinkWrapper>
  );

  render() {
    const { currentAction, handleClose, handleDelete, id, users } = this.props;
    const { search, sort } = this.state;

    const sortedUsers = users ? this.sortUserData(users, sort) : users;

    return (
      <Wrapper>
        <HeadingWrapper>
          <SearchInputWithState name="search" placeholder="Filter Users" onChange={this.handleInputChange} />

          <ButtonLink to={ROUTES.ADMIN_USERS_NEW}>Add User</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {filterUserList(search, sortedUsers).map((user: User) => (
            <Row key={user.id}>
              <UserCard user={user} ctas={this.renderButtons(user)} />
            </Row>
          ))}
        </ListWrapper>

        <CSSTransition in={currentAction === Stage.New} {...sharedAdminFormsCSSTransitionProps}>
          <AddEditWrapper>
            <NewUserForm handleCancel={handleClose} handleSuccess={handleClose} />
          </AddEditWrapper>
        </CSSTransition>

        <CSSTransition in={currentAction === Stage.Edit} {...sharedAdminFormsCSSTransitionProps}>
          <AddEditWrapper>
            <EditUserForm id={id} handleCancel={handleClose} handleDelete={handleDelete} handleSuccess={handleClose} />
          </AddEditWrapper>
        </CSSTransition>

        {currentAction === Stage.Delete && (
          <Modal handleClose={!handleClose ? noop : handleClose}>
            <ConfirmUserDelete handleCancel={handleClose} handleSuccess={handleClose} id={id} />
          </Modal>
        )}

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
