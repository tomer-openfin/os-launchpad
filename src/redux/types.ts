import { MeState } from './me';

interface Bounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface Windows {
  byId: {
    [id: string]: {
      bounds: Bounds;
      id: string;
    },
  };
  ids: string[];
}

export interface State {
  me: MeState;
  // TODO: either type out or add into redux-openfin package
  windows: Windows;
}
