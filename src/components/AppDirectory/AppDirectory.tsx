import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import {
  Directory,
  SearchHeader,
  SearchInput,
  Wrapper,
} from './AppDirectory.css';

import { App } from '../../redux/apps/types';

import { APP_DIRECTORY_WINDOW } from '../../config/windows';
import noop from '../../utils/noop';

import AppCard from '../AppCard';
import IconSpace from '../IconSpace';

interface Props {
  appList: App[];
  addWindowListener: Function;
  hideWindow: Function;
  removeWindowListener: Function;
}

interface State {
  search: string;
}

const defaultProps: Props = {
  addWindowListener: noop,
  appList: [],
  hideWindow: noop,
  removeWindowListener: noop,
};

class AppDirectory extends React.Component<Props, State> {
  static defaultProps = defaultProps;
  private searchInput: HTMLInputElement | undefined;

  constructor(props) {
    super(props);

    this.state = { search: '' };
  }

  componentDidMount() {
    this.props.addWindowListener(APP_DIRECTORY_WINDOW, 'blurred', () => this.props.hideWindow(APP_DIRECTORY_WINDOW));

    if (this.searchInput) this.searchInput.focus();
  }

  componentWillUnmount() {
    this.props.removeWindowListener(APP_DIRECTORY_WINDOW, 'blurred', () => this.props.hideWindow(APP_DIRECTORY_WINDOW));
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    if (!currentTarget) return;
    const { value } = currentTarget;
    if (typeof value !== 'string') return;

    this.setState({
      search: value,
    });
  };

  filteredAppList() {
    const { appList } = this.props;
    const { search } = this.state;

    return appList.filter(app => app.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  setSearchInputRef = input => {
    this.searchInput = input;
  };

  render() {
    return(
      <Wrapper>
        <SearchHeader>
          <IconSpace iconImg={searchIcon} />

          <SearchInput ref={this.setSearchInputRef} onChange={this.handleChange} placeholder="Search for app..." />
        </SearchHeader>

        <Directory>
          {this.filteredAppList().map((app: App) => <AppCard key={app.id} app={app} />)}
        </Directory>
      </Wrapper>
    );
  }
}

export default AppDirectory;
