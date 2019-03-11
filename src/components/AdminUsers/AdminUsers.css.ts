import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as EditIcon from '../../assets/Edit.svg';
import * as TrashIcon from '../../assets/Trash.svg';

import { TypeStyleCanopus, TypeStyleEnif } from '../../styles/typography.css';
import { Wrapper as RequestFormWrapper } from '../RequestForm/RequestForm.css';

import { Color } from '../../styles';
import { ADMIN_FORMS_EASING_FUNCTION, ADMIN_FORMS_ENTER_DURATION, ADMIN_FORMS_EXIT_DURATION, ADMIN_FORMS_TRANSITION_CLASSNAMES } from '../../utils/adminForms';

import { Label, LABEL_EASING_FUNCTION, LABEL_TRANSITION_DURATION } from '../FormField';

export const AddEditWrapper = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;

  ${Label} {
    transition-property: opacity, transform;
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter {
    ${RequestFormWrapper} {
      transform: translate3d(100%, 0, 0);
    }

    ${Label} {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter-active {
    ${RequestFormWrapper} {
      transform: translate3d(0%, 0, 0);
      transition: transform ${ADMIN_FORMS_ENTER_DURATION}ms ${ADMIN_FORMS_EASING_FUNCTION};
    }

    ${Label} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all ${LABEL_TRANSITION_DURATION}ms ${LABEL_EASING_FUNCTION} ${ADMIN_FORMS_ENTER_DURATION}ms;
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter-done {
    ${RequestFormWrapper} {
      transform: translate3d(0%, 0, 0);
    }

    ${Label} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit {
    ${RequestFormWrapper} {
      transform: translate3d(0%, 0, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit-active {
    ${RequestFormWrapper} {
      transform: translate3d(100%, 0, 0);
      transition: transform ${ADMIN_FORMS_EXIT_DURATION}ms ${ADMIN_FORMS_EASING_FUNCTION};
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit-done {
    ${RequestFormWrapper} {
      transform: translate3d(100%, 0, 0);
    }
  }
`;

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
