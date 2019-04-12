import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as EditIcon from '../../assets/Edit.svg';
import * as TrashIcon from '../../assets/Trash.svg';

import { TypeStyleCanopus, TypeStyleEnif } from '../../styles/typography.css';
import { Wrapper as CheckboxWrapper } from '../Checkbox';

import { Color } from '../../styles';
import { ADMIN_FORMS_EASING_FUNCTION, ADMIN_FORMS_ENTER_DURATION, ADMIN_FORMS_EXIT_DURATION, ADMIN_FORMS_TRANSITION_CLASSNAMES } from '../../utils/adminForms';

import { LABEL_EASING_FUNCTION, LABEL_TRANSITION_DURATION, Wrapper as LabelWrapper } from '../Label';

export const AddEditWrapper = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;

  ${LabelWrapper}, ${CheckboxWrapper} {
    transition-property: opacity, transform;
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter {
    & > :first-child {
      transform: translate3d(100%, 0, 0);
    }

    ${LabelWrapper}, ${CheckboxWrapper} {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter-active {
    & > :first-child {
      transform: translate3d(0%, 0, 0);
      transition: transform ${ADMIN_FORMS_ENTER_DURATION}ms ${ADMIN_FORMS_EASING_FUNCTION};
    }

    ${LabelWrapper}, ${CheckboxWrapper} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: all ${LABEL_TRANSITION_DURATION}ms ${LABEL_EASING_FUNCTION};
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-enter-done {
    & > :first-child {
      transform: translate3d(0%, 0, 0);
    }

    ${LabelWrapper}, ${CheckboxWrapper} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit {
    & > :first-child {
      transform: translate3d(0%, 0, 0);
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit-active {
    & > :first-child {
      transform: translate3d(100%, 0, 0);
      transition: transform ${ADMIN_FORMS_EXIT_DURATION}ms ${ADMIN_FORMS_EASING_FUNCTION};
    }
  }

  &.${ADMIN_FORMS_TRANSITION_CLASSNAMES}-exit-done {
    & > :first-child {
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
  bottom: 0;
  height: 44px;
  position: fixed;

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
