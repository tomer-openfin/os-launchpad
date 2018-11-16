import * as React from 'react';

import { HeadingWrapper, Input, LinkButton, LinkWrapper, ListElement, ListWrapper, Wrapper } from '../UserDirectory';

import { App } from '../../types/commons';

import noop from '../../utils/noop';

interface Props {
  apps: App[];
}

interface State {
  search: string;
}

class AdminApps extends React.PureComponent<Props, State> {
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
    this.props.apps.filter(app =>
      app.title
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1);

  renderButtons = () => {
    return (
      <LinkWrapper>
        <LinkButton onClick={noop}>Edit</LinkButton>
        <LinkButton onClick={noop}>Delete</LinkButton>
      </LinkWrapper>
    );
  };

  render() {
    const { search } = this.state;

    return (
      <Wrapper>
        <HeadingWrapper>
          <Input name="search" value={search} onChange={this.handleInputChange} placeholder="Search apps..." type="text" />
        </HeadingWrapper>

        <ListWrapper>
          {this.filterAppsList(search).map(app => (
            <li key={app.id}>
              <ListElement>{app.title}</ListElement>
              <ListElement>{this.renderButtons()}</ListElement>
            </li>
          ))}
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default AdminApps;
