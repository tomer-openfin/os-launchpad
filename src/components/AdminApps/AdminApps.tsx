import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { AddEditWrapper, DeleteIconLink, EditIconLink, HeadingWrapper, LinkWrapper, ListWrapper, Wrapper } from '../AdminUsers/AdminUsers.css';

import { App } from '../../types/commons';
import { sharedAdminFormsCSSTransitionProps } from '../../utils/adminForms';
import noop from '../../utils/noop';
import { ROUTES } from '../Router/consts';

import AppCard from '../AppCard';
import { Row } from '../AppDirectory';
import { ButtonLink } from '../Button';
import ConfirmAppDelete from '../ConfirmAppDelete';
import EditAppForm from '../EditAppForm';
import Modal from '../Modal';
import NewAppForm from '../NewAppForm';
import { SearchInputWithState } from '../SearchInput';

export enum Stage {
  Default = 'default',
  Delete = 'delete',
  Edit = 'edit',
  New = 'new',
}

export interface Props {
  apps?: App[];
  currentAction?: string;
  handleClose?: () => void;
  handleDelete?: () => void;
  id?: string;
}

interface State {
  search: string;
}

const defaultProps: Partial<Props> = {
  apps: [],
  currentAction: Stage.Default,
};

class AdminApps extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  handleInputChange = (search: string) => this.setState({ search });

  filterAppsList = (search: string): App[] | undefined => {
    const { apps } = this.props;

    if (search && apps) {
      return apps.filter(app => app.title && app.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }

    return apps;
  };

  renderButtons = (app: App) => (
    <LinkWrapper vertical>
      <EditIconLink to={`${ROUTES.ADMIN_APPS_EDIT}${app.id}`} />

      <DeleteIconLink to={`${ROUTES.ADMIN_APPS_DELETE}${app.id}`} />
    </LinkWrapper>
  );

  render() {
    const { currentAction, handleClose, handleDelete, id } = this.props;
    const { search } = this.state;
    const appsList = this.filterAppsList(search);

    return (
      <Wrapper>
        <HeadingWrapper>
          <SearchInputWithState name="search" onChange={this.handleInputChange} placeholder="Search apps..." />

          <ButtonLink to={ROUTES.ADMIN_APPS_NEW}>Add App</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {appsList &&
            appsList.map((app: App) => (
              <Row key={app.id}>
                <AppCard app={app} ctas={this.renderButtons(app)} />
              </Row>
            ))}
        </ListWrapper>

        <CSSTransition in={currentAction === Stage.New} {...sharedAdminFormsCSSTransitionProps}>
          <AddEditWrapper>
            <NewAppForm handleCancel={handleClose} handleSuccess={handleClose} />
          </AddEditWrapper>
        </CSSTransition>

        <CSSTransition in={currentAction === Stage.Edit} {...sharedAdminFormsCSSTransitionProps}>
          <AddEditWrapper>
            <EditAppForm appId={id} handleCancel={handleClose} handleDelete={handleDelete} handleSuccess={handleClose} />
          </AddEditWrapper>
        </CSSTransition>

        {currentAction === Stage.Delete && (
          <Modal handleClose={!handleClose ? noop : handleClose}>
            <ConfirmAppDelete handleCancel={handleClose} handleSuccess={handleClose} id={id} />
          </Modal>
        )}
      </Wrapper>
    );
  }
}

export default AdminApps;
