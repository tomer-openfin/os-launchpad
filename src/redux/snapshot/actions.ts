import { createAction, createAsyncActionCreators } from '../utils';

import { Identity } from '../../types/commons';
import { SnapshotState } from './types';

const CLEAR_SNAPSHOT = 'CLEAR_SNAPSHOT';
const SET_SNAPSHOT_ANCHOR = 'SET_SNAPSHOT_ANCHOR';

const GET_AND_SET_SNAPSHOT_REQUEST = 'GET_AND_SET_SNAPSHOT_REQUEST';
const GET_AND_SET_SNAPSHOT_SUCCESS = 'GET_AND_SET_SNAPSHOT_SUCCESS';
const GET_AND_SET_SNAPSHOT_FAILURE = 'GET_AND_SET_SNAPSHOT_FAILURE';

export const clearSnapshot = createAction(CLEAR_SNAPSHOT)();
export const setSnapshotAnchor = createAction(SET_SNAPSHOT_ANCHOR)<Pick<SnapshotState, 'anchor'> & Pick<SnapshotState, 'anchorIdentity'>>();

export const getAndSetSnapshot = createAsyncActionCreators(GET_AND_SET_SNAPSHOT_REQUEST, GET_AND_SET_SNAPSHOT_SUCCESS, GET_AND_SET_SNAPSHOT_FAILURE)<
  Identity,
  Pick<SnapshotState, 'imgSrc'> & Pick<SnapshotState, 'sourceBounds'> & Pick<SnapshotState, 'sourceIdentity'>,
  Error
>();
