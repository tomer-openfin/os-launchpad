import * as React from 'react';

import * as trashIcon from '../../assets/Trash.svg';

import { Color } from '../../styles';
import { HeadingText } from '../AdminConfirmation/AdminConfirmation.css';
import { MessageBannerWrapper, Wrapper } from './FormWindow.css';

import { MessageResponseProps } from '../../hocs/withResponseState';

import Borders from '../Borders';
import { MessageBannerWithTimeout } from '../MessageBanner';
import SvgIcon from '../SvgIcon';
import WindowHeader from '../WindowHeader';

interface Props extends MessageResponseProps {
  handleDeleteIconClick?: () => void;
  headingText: string;
  children?: React.ReactChild;
}

const FormWindow = ({ children, handleDeleteIconClick, headingText, message, responseError, resetResponseError }: Props) => (
  <Wrapper>
    <Borders height="100%" width="100%">
      <WindowHeader backgroundColor={Color.VACUUM} label={headingText}>
        <HeadingText>{headingText}</HeadingText>

        {handleDeleteIconClick && <SvgIcon color={Color.MERCURY} hoverColor={Color.MARS} size={30} imgSrc={trashIcon} onClick={handleDeleteIconClick} />}
      </WindowHeader>

      {children}

      <MessageBannerWrapper>
        <MessageBannerWithTimeout reset={resetResponseError} timeout={5000} message={message} isActive={responseError} />
      </MessageBannerWrapper>
    </Borders>
  </Wrapper>
);

export default FormWindow;
