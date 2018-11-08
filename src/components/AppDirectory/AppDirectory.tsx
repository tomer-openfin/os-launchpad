import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import {
  Directory,
  SearchHeader,
  SearchInput,
  Wrapper,
} from './AppDirectory.css';

import { App } from '../../redux/apps/types';

import AppCard from '../AppCard';
import IconSpace from '../IconSpace';

interface Props {
  appList: App[];
}

interface State {
  search: string;
}

const defaultProps: Props = {
  appList: [],
};

class AppDirectory extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  constructor(props) {
    super(props);

    this.state = { search: '' };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (!currentTarget) return;
    const { value } = currentTarget;
    if (typeof value !== 'string') return;

    this.setState({
      search: value,
    });
  }

  filteredAppList() {
    const { appList } = this.props;
    const { search } = this.state;

    return appList.filter(app => app.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  render() {
    return(
      <Wrapper>
        <SearchHeader>
          <IconSpace iconImg={searchIcon} />

          <SearchInput onChange={this.handleChange} placeholder="Search for app..." />
        </SearchHeader>

        <Directory>
          {this.filteredAppList().map((app: App) => <AppCard key={app.id} app={app} />)}
        </Directory>
      </Wrapper>
    );
  }
}

export default AppDirectory;
