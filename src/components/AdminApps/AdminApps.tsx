import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { DeleteIconLink, EditIconLink, HeadingWrapper, LinkWrapper, ListWrapper, Wrapper } from '../AdminUsers/AdminUsers.css';
import { ButtonLink } from '../Button/Button.css';

import { App } from '../../types/commons';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { ADMIN_APPS_ROUTES, ROUTES } from '../Router/consts';

import AppCard from '../AppCard';
import { Row } from '../AppDirectory';
import Modal from '../Modal';
import { SearchInputWithState } from '../SearchInput';

const ADMIN_APPS_PATHS = Object.values(ADMIN_APPS_ROUTES);

interface Props extends RouteComponentProps {
  apps: App[];
}

interface State {
  search: string;
}

const defaultProps: Partial<Props> = {
  apps: [],
};

class AdminApps extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  handleInputChange = (search: string) => {
    this.setState({ search });
  };

  filterAppsList = search =>
    search ? this.props.apps.filter(app => app.title && app.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) : this.props.apps;

  renderButtons = app => {
    return (
      <LinkWrapper vertical>
        <EditIconLink to={{ pathname: ROUTES.ADMIN_APPS_EDIT, state: app }} />

        <DeleteIconLink to={{ pathname: ROUTES.ADMIN_APPS_DELETE, state: app }} />
      </LinkWrapper>
    );
  };

  render() {
    const { children, history } = this.props;
    const { search } = this.state;

    return (
      <Wrapper>
        <HeadingWrapper>
          <SearchInputWithState name="search" onChange={this.handleInputChange} placeholder="Search apps..." />

          <ButtonLink to={ROUTES.ADMIN_APPS_NEW}>Add App</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.filterAppsList(search).map(app => (
            <Row key={app.id}>
              <AppCard app={app} ctas={this.renderButtons(app)} />
            </Row>
          ))}
        </ListWrapper>

        {doesCurrentPathMatch(ADMIN_APPS_PATHS, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
      </Wrapper>
    );
  }
}

export default AdminApps;
