import * as React from 'react';
import { ContextMenuOption, ContextMenuRequestPayload } from '../../redux/contextMenu/types';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  openContextMenu: (options: ContextMenuRequestPayload) => void;
  options?: ContextMenuOption[];
}

class ContextMenuZone extends React.PureComponent<Props> {
  handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const { openContextMenu, options } = this.props;
    if (!options) {
      return;
    }

    e.preventDefault();

    openContextMenu({ anchor: { left: e.screenX, top: e.screenY }, options });
  };

  render() {
    const { children, className, onClick } = this.props;
    return (
      <div className={className} onClick={onClick} onContextMenu={this.handleContextMenu}>
        {children}
      </div>
    );
  }
}

export default ContextMenuZone;
