import * as React from 'react';

import config from '../../config/windows';
import { App } from '../../redux/apps/types';
import { WindowConfig } from '../../redux/windows/types';

import * as appsIcon from '../../assets/app-list-button.svg';
import * as cog from '../../assets/cog.svg';
import * as gradient from '../../assets/gradient.svg';
import * as logo from '../../assets/logo-new.png';
import * as searchIcon from '../../assets/replay.svg';

import { CloseButton, Wrapper } from './App.css';

import AppList from '../AppList';
import IconSpace from '../IconSpace';

interface Props {
  launchWindowCreator: (window: WindowConfig) => () => void;
}

const App = ({ launchWindowCreator }: Props) => (
  <Wrapper>
    <IconSpace backgroundImg={gradient} iconImg={logo} draggable />

    <IconSpace iconImg={searchIcon} />

    <AppList />

    <IconSpace iconImg={appsIcon} onClick={launchWindowCreator(config.appDirectory)} />

    <IconSpace iconImg={cog} />

    <CloseButton />
  </Wrapper >
);

export default App;
