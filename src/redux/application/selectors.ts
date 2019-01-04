import { State } from '../types';

export const getApplicationState = (state: State) => state.application;
export const getBlurringWindows = (state: State) => getApplicationState(state).blurringWindows;
export const getBlurringWindowByName = (state: State, name) => getBlurringWindows(state)[name];
export const getApplicationIsExpanded = (state: State) => getApplicationState(state).isExpanded;
export const getIsDragAndDrop = (state: State) => getApplicationState(state).isDragAndDrop;
export const getDrawerIsExpanded = (state: State) => getApplicationState(state).isDrawerExpanded;
export const getIsEnterprise = (state: State) => getApplicationState(state).isEnterprise;
