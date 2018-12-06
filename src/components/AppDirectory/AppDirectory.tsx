import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import { Directory, SearchHeader, SearchInput, Wrapper } from './AppDirectory.css';

import { App } from '../../types/commons';

import AppCard from '../AppCard';
import IconSpace from '../IconSpace';

interface Props {
  appList: App[];
  onBlur: () => void;
}

interface State {
  search: string;
}

class AppDirectory extends React.PureComponent<Props, State> {
  // static defaultProps = defaultProps;
  private searchInput: HTMLInputElement | undefined;

  constructor(props) {
    super(props);

    this.state = { search: '' };
  }

  componentDidMount() {
    if (this.searchInput) this.searchInput.focus();
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (!currentTarget) return;
    const { value } = currentTarget;
    if (typeof value !== 'string') return;

    const search = value;

    this.setState({
      search,
    });
  };

  filterAppList = search => this.props.appList.filter(app => app.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);

  setSearchInputRef = input => {
    this.searchInput = input;
  };

  render() {
    const { search } = this.state;

    return (
      <Wrapper>
        <SearchHeader>
          <IconSpace iconImg={searchIcon} />

          <SearchInput ref={this.setSearchInputRef} onChange={this.handleChange} placeholder="Search for app..." />
        </SearchHeader>

        <Directory>
          {this.filterAppList(search).map((app: App) => (
            <AppCard key={app.id} app={app} />
          ))}
        </Directory>
      </Wrapper>
    );
  }
}

export default AppDirectory;
