import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getSettingsMenuOptionsSelector } from '../../redux/selectors';
import { State } from '../../redux/types';
import { EventType, sendAnalytics } from '../../utils/analytics';
import { hideWindow } from '../../utils/finUtils';

import { Props } from './LauncherMenu';

interface MapState {
  options: ReturnType<typeof getSettingsMenuOptionsSelector>;
}

interface MapDispatch {
  dispatch: Dispatch;
}

const mapSettingsState = (state: State): MapState => ({
  options: getSettingsMenuOptionsSelector(state),
});

const mapDispatch = (dispatch: Dispatch): MapDispatch => ({ dispatch });

const mergeProps = ({ options }, { dispatch }): Props => ({
  handleClickOption: () => {
    // tslint:disable-next-line:no-console
    hideWindow()().catch(e => console.warn('Caught error in hiding window:', e));
  },
  options: options.map(({ action, icon, label }) => ({
    handleClick: () => {
      sendAnalytics({ type: EventType.Click, label });
      dispatch(action);
    },
    icon,
    label,
  })),
});

export const withSettings = connect<MapState, MapDispatch, null, Props, State>(
  mapSettingsState,
  mapDispatch,
  mergeProps,
);
