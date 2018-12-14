import * as React from 'react';

import { CTAWrapper, InfoWrapper, UserEmail, UserName, Wrapper } from './UserCard.css';

import { User } from '../../types/commons';

interface Props {
  user: User;
  ctas?: React.ReactNode;
}

const AppCard = ({ user, ctas }: Props) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <UserName>
          {user.firstName} {user.lastName}
        </UserName>

        <UserEmail>{user.email}</UserEmail>
      </InfoWrapper>

      <CTAWrapper>{ctas}</CTAWrapper>
    </Wrapper>
  );
};

export default AppCard;
