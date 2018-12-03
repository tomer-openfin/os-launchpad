import * as React from 'react';
import { ContextMenuOption, ContextMenuRequestPayload } from '../../redux/contextMenu/types';

interface Props {
  children: React.ReactNode;
  openContextMenu: (options: ContextMenuRequestPayload) => void;
  options: ContextMenuOption[];
}

class ContextMenuZone extends React.PureComponent<Props> {
  handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { openContextMenu, options } = this.props;

    openContextMenu({ anchor: { left: e.screenX, top: e.screenY }, options });
  };

  render() {
    const { children } = this.props;
    return <div onContextMenu={this.handleContextMenu}>{children}</div>;
  }
}

export default ContextMenuZone;