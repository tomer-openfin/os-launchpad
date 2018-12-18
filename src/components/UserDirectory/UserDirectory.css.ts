import styled from 'styled-components';

import { Link } from 'react-router-dom';

import * as EditIcon from '../../assets/Edit.svg';
import * as SearchIcon from '../../assets/Search.svg';
import * as TrashIcon from '../../assets/Trash.svg';

import { Color } from '../../styles/index';

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

export const LinkWrapper = styled.div<{ vertical?: boolean }>`
  align-items: baseline;
  display: flex;
  ${props => props.vertical && 'flex-direction: column;'}
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Input = styled.input`
  border-radius: 3px;
  border: none;
  font-size: 14px;
  height: 36px;
  padding: 0 10px 0 36px;
  min-width: 200px;
  max-width: 290px;
  outline: none;
  color: ${Color.MERCURY};
  background: url(${SearchIcon}) ${Color.VACUUM};
  background-repeat: no-repeat;
  flex: 1;
`;

export const Select = styled.select`
  border: 1px solid ${Color.NEBULA};
  border-radius: 2px;
  line-height: normal;
  color: ${Color.MERCURY};
  background-color: ${Color.VACUUM};
  outline: none;
`;

export const SortWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  flex-shrink: 0;
  padding: 0 10px;
`;

export const DeleteIconLink = styled(Link)`
  background-color: ${Color.MERCURY};
  mask: url(${TrashIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  color: ${Color.COMET};
  margin: 5px;
  height: 40px;
  width: 40px;

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
  margin: 5px;
  height: 40px;
  width: 40px;

  &:hover {
    background-color: ${Color.JUPITER};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.PLUTO};
    cursor: default;
  }
`;

export const ButtonLink = styled(Link)`
  background-color: ${Color.NEPTUNE};
  color: ${Color.COMET};
  border-radius: 3px;
  margin: 10px 5px;
  height: 36px;
  min-width: 109px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
  font-size: 12px;
  flex-shrink: 0;

  &:hover {
    background-color: ${Color.NEBULA};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.MERCURY};
    cursor: default;
  }
`;

export const ListWrapper = styled.div`
  color: ${Color.CHARCOAL};
  font-size: 10px;
  overflow-y: scroll;
  flex: 1;

  & > li {
    align-items: center;
    border-bottom: 1px solid ${Color.FOG};
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 25px 0;
    height: 25px;
    padding-right: 25px;
    padding-bottom: 25px;
  }
`;

export const ListElement = styled.div`
  flex: 1;
  text-align: left;
`;
