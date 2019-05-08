import { DeepReadonly } from '../../types/utils';
import { clearSnapshot, setOverlayIdentity, setSnapshot, setSnapshotImgSrc } from './actions';
import { SnapshotActions, SnapshotState } from './types';

type ReadonlySnapshotState = DeepReadonly<SnapshotState>;

const defaultState: ReadonlySnapshotState = {
  anchorIdentity: null,
  imgSrc: '',
  overlayIdentity: null,
  snapshotIdentity: null,
};

export default (state: ReadonlySnapshotState = defaultState, action: SnapshotActions): ReadonlySnapshotState => {
  switch (action.type) {
    case clearSnapshot.toString(): {
      return {
        ...state,
        anchorIdentity: null,
        imgSrc: '',
        snapshotIdentity: null,
      };
    }
    case setOverlayIdentity.toString(): {
      return {
        ...state,
        overlayIdentity: action.payload,
      };
    }
    case setSnapshot.toString(): {
      return {
        ...state,
        ...action.payload,
      };
    }
    case setSnapshotImgSrc.toString(): {
      return {
        ...state,
        imgSrc: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
