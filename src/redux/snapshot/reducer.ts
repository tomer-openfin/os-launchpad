import { DeepReadonly } from '../../types/utils';
import { clearSnapshot, getAndSetSnapshot, setSnapshotAnchor } from './actions';
import { SnapshotActions, SnapshotState } from './types';

type ReadonlySnapshotState = DeepReadonly<SnapshotState>;

const defaultState: ReadonlySnapshotState = {
  anchor: {
    left: 0,
    top: 0,
  },
  anchorIdentity: null,
  imgSrc: '',
  sourceBounds: {
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  },
  sourceIdentity: null,
};

export default (state: ReadonlySnapshotState = defaultState, action: SnapshotActions): ReadonlySnapshotState => {
  switch (action.type) {
    case clearSnapshot.toString(): {
      return defaultState;
    }
    case getAndSetSnapshot.success.toString(): {
      return {
        ...state,
        ...action.payload,
      };
    }
    case setSnapshotAnchor.toString(): {
      return {
        ...state,
        anchor: {
          ...action.payload.anchor,
        },
        anchorIdentity: action.payload.anchorIdentity,
      };
    }
    default: {
      return state;
    }
  }
};
