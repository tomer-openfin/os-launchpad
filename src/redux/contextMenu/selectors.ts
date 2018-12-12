import { State } from '../types';

export const getContextMenuState = (state: State) => state.contextMenu;
export const getContextMenuOptions = (state: State) => getContextMenuState(state).options;
