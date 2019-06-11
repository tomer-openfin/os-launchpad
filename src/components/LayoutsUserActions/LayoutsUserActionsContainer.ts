import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { dismissUndoUpdateLayout, saveLayout, undoUpdateLayout } from '../../redux/layouts';

import LayoutsUserActions from './LayoutsUserActions';

const mapDispatch = (dispatch: Dispatch) => ({
  dismissUndoLayout: () => dispatch(dismissUndoUpdateLayout.request()),
  saveLayout: (name: string, meta: { successCb: (updated: boolean) => void; errorCb: () => void }) => {
    const successCb = ({ updated }: { updated?: boolean }) => {
      meta.successCb(!!updated);
    };

    dispatch(saveLayout.request(name, { onSuccess: successCb, onFailure: meta.errorCb }));
  },
  undoLayout: (meta: { successCb: () => void; errorCb: () => void }) =>
    dispatch(undoUpdateLayout.request(undefined, { onSuccess: meta.successCb, onFailure: meta.errorCb })),
});

export default connect(
  null,
  mapDispatch,
)(LayoutsUserActions);
