import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Modal from '../Modal';
import {
  ButtonLink,
  DeleteIconLink,
  EditIconLink,
  HeadingWrapper,
  Input,
  InputWrapper,
  LinkWrapper,
  ListWrapper,
  Wrapper,
} from '../UserDirectory/UserDirectory.css';

import { App } from '../../types/commons';
import { doesCurrentPathMatch } from '../../utils/routeHelpers';
import { appRoutes, ROUTES } from '../Router';

import AppCard from '../AppCard';
import { Row } from '../AppDirectory';

interface Props {
  apps: App[];
}

interface State {
  search: string;
}

const defaultProps: Props = {
  apps: [],
};

class AdminApps extends React.PureComponent<Props & RouteComponentProps, State> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      search: '',
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
          <InputWrapper>
            <Input name="search" value={search} onChange={this.handleInputChange} placeholder="Search apps..." type="text" />
          </InputWrapper>

          <ButtonLink to={ROUTES.ADMIN_APPS_NEW}>Add App</ButtonLink>
        </HeadingWrapper>

        <ListWrapper>
          {this.filterAppsList(search).map(app => (
            <Row key={app.id}>
              <AppCard app={app} ctas={this.renderButtons(app)} />
            </Row>
          ))}
        </ListWrapper>

        {doesCurrentPathMatch(appRoutes, location.pathname) && <Modal handleClose={history.goBack}>{children}</Modal>}
      </Wrapper>
    );
  }
}

export default AdminApps;
