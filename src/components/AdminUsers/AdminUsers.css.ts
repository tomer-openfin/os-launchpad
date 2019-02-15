import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as EditIcon from '../../assets/Edit.svg';
import * as TrashIcon from '../../assets/Trash.svg';

import { Color } from '../../styles';
import { TypeStyleCanopus, TypeStyleEnif } from '../../styles/typography.css';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${Color.COMET};

  & > ul {
    list-style: none;
    margin: 0;
  }
`;

export const HeadingWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 17px 20px 10px;
  width: 100%;
`;

export const Footer = styled.div`
  height: 44px;

  &:after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    background-color: ${Color.KUIPER_BELT};
    z-index: -1;
  }
`;

export const LinkWrapper = styled.div<{ vertical?: boolean }>`
  align-items: baseline;
  display: flex;
  ${props => props.vertical && 'flex-direction: column;'}
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const SortButton = styled.div<{ active: boolean }>`
  ${TypeStyleCanopus}

  margin: 10px;
  cursor: pointer;
  color: ${Color.SUN};
  opacity: ${props => (props.active ? '1' : '0.5')};
`;

export const SortWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  padding: 12px;
`;

export const SortHeader = styled.div`
  ${TypeStyleEnif}

  color: ${Color.JUPITER};
  margin-right: 10px;
`;

export const DeleteIconLink = styled(Link)`
  background-color: ${Color.MERCURY};
  mask: url(${TrashIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  color: ${Color.COMET};
  margin-left: 10px;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: ${Color.MARS};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.PLUTO};
    cursor: default;
  }
`;

export const EditIconLink = styled(Link)`
  background-color: ${Color.MERCURY};
  mask: url(${EditIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  color: ${Color.COMET};
  border-radius: 3px;
  margin-left: 10px;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: ${Color.JUPITER};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.PLUTO};
    cursor: default;
  }
`;

export const ListWrapper = styled.div`
  font-size: 10px;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 25px;
`;
