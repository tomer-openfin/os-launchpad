import * as React from 'react';

import * as searchIcon from '../../assets/Search.svg';

import { CTA, Directory, Row, SearchHeader, SearchInput, Wrapper } from './AppDirectory.css';

import { App } from '../../types/commons';

import AppCard, { IconWrapper } from '../AppCard';
import IconSpace from '../IconSpace';
import WindowHeader from '../WindowHeader';

interface Props {
  addToLauncher: (appId: App['id']) => void;
  appList: App[];
  getIsLauncherApp: (appId: App['id']) => boolean;
  removeFromLauncher: (appId: App['id']) => void;
  onBlur: () => void;
  onEscDown: () => void;
}

interface State {
  search: string;
}

const renderCTAText = (isLauncherApp: boolean) => (isLauncherApp ? '-' : '+');

class AppDirectory extends React.PureComponent<Props, State> {
  private searchInput: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.state = { search: '' };
  }

  componentDidMount() {
    const { fin } = window;

    if (fin) {
      fin.desktop.Window.getCurrent().addEventListener('focused', this.focusInputField);
      fin.desktop.Window.getCurrent().addEventListener('hidden', this.clearInputField);
    }
  }

  componentWillUnmount() {
    const { fin } = window;

    if (fin) {
      fin.desktop.Window.getCurrent().removeEventListener('focused', this.focusInputField);
      fin.desktop.Window.getCurrent().removeEventListener('hidden', this.clearInputField);
    }
  }

  clearInputField = () => {
    if (this.searchInput.current) {
      this.searchInput.current.value = '';
      this.setState({ search: this.searchInput.current.value });
    }
  };

  focusInputField = () => {
    if (this.searchInput.current) {
      this.searchInput.current.focus();
    }
  };

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

  renderAppCTA(app: App) {
    const { getIsLauncherApp, addToLauncher, removeFromLauncher } = this.props;

    const isLauncherApp = getIsLauncherApp(app.id);

    return <CTA onClick={isLauncherApp ? () => removeFromLauncher(`${app.id}`) : () => addToLauncher(`${app.id}`)}>{renderCTAText(isLauncherApp)}</CTA>;
  }

  render() {
    const { search } = this.state;

    return (
      <Wrapper>
        <WindowHeader>
          <SearchHeader>
            <IconWrapper>
              <IconSpace iconImg={searchIcon} />
            </IconWrapper>

            <SearchInput ref={this.searchInput} onChange={this.handleChange} placeholder="Search for app..." />
          </SearchHeader>
        </WindowHeader>

        <Directory>
          {this.filterAppList(search).map((app: App) => (
            <Row key={app.id}>
              <AppCard app={app} ctas={this.renderAppCTA(app)} />
            </Row>
          ))}
        </Directory>
      </Wrapper>
    );
  }
}

export default AppDirectory;
