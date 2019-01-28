import * as React from 'react';

import { User, UserStatus } from '../../types/commons';

import { Color } from '../../styles';
import { Badge, CTAWrapper, InfoWrapper, NameAndBadgeWrapper, UserEmail, UserName, Wrapper } from './UserCard.css';

import * as AdminIcon from '../../assets/Admin.svg';
import * as ClockIcon from '../../assets/Clock.svg';

interface Props {
  user: User;
  ctas?: React.ReactNode;
}

const UserCard = ({ user, ctas }: Props) => (
  <Wrapper>
    <InfoWrapper>
      <NameAndBadgeWrapper>
        <UserName title={`${user.firstName} ${user.lastName}`}>
          {user.firstName}&nbsp;{user.lastName}
        </UserName>

        {user.isAdmin && <Badge size={16} color={Color.JUPITER} imgSrc={AdminIcon} title="Admin" />}

        {user.status === UserStatus.ChangePassword && <Badge size={16} color={Color.MARS} imgSrc={ClockIcon} title="User has not logged in yet" />}
      </NameAndBadgeWrapper>

      <UserEmail title={user.email}>{user.email}</UserEmail>
    </InfoWrapper>

    <CTAWrapper>{ctas}</CTAWrapper>
  </Wrapper>
);

export default UserCard;
