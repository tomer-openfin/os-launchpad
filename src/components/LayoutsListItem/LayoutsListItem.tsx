import * as React from 'react';

import * as closeIcon from '../../assets/CloseCircle.svg';

import { Color } from '../../styles';
import SvgIcon from '../SvgIcon/SvgIcon';
import { Item, Row } from './LayoutsListItem.css';

interface Props {
  deleteLayout: (id: string) => void;
  id: string;
  name: string;
  onBlur: () => void;
  restoreLayout: (id: string) => void;
}

const LayoutsListItem = ({ deleteLayout, id, name, restoreLayout, onBlur }: Props) => {
  const handleRestoreClick = () => {
    onBlur();
    restoreLayout(id);
  };

  const handleDeleteClick = () => {
    deleteLayout(id);
  };

  return (
    <Row>
      <Item key={id} onClick={handleRestoreClick}>
        {name}
      </Item>

      <SvgIcon hoverColor={Color.MARS} imgSrc={closeIcon} onClick={handleDeleteClick} size={14} />
    </Row>
  );
};

export default LayoutsListItem;
