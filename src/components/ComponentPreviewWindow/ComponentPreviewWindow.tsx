import * as React from 'react';

import { PreviewType } from '../../redux/admin/types';
import noop from '../../utils/noop';
import { LoginView, Stage } from '../Login/Login';

import ComponentPreview from '../ComponentPreview/index';
import ComponentPreviewShortcut from '../ComponentPreviewShortcut';
import ComponentPreviewSplash from '../ComponentPreviewSplash';

interface Props {
  handleClose: () => void;
  previewType: PreviewType;
}

const ComponentPreviewWindow = ({ previewType, handleClose }: Props) => (
  <ComponentPreview handleClose={handleClose}>
    {previewType === PreviewType.Login && (
      <LoginView closeApplication={noop} handleError={noop} isTabDisabled message="" error={false} session="" stage={Stage.Login} username="" />
    )}

    {previewType === PreviewType.Shortcut && <ComponentPreviewShortcut />}

    {previewType === PreviewType.Splash && <ComponentPreviewSplash />}
  </ComponentPreview>
);

export default ComponentPreviewWindow;
