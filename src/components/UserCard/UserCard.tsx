import * as React from 'react';

import { AdminBadge, CTAWrapper, InfoWrapper, NameAndBadgeWrapper, UserEmail, UserName, Wrapper } from './UserCard.css';

import { User } from '../../types/commons';

interface Props {
  user: User;
  ctas?: React.ReactNode;
}

const AppCard = ({ user, ctas }: Props) => {
  return (
    <Wrapper>
      <InfoWrapper>
        <NameAndBadgeWrapper>
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>

          <AdminBadge isAdmin={user.isAdmin} />
        </NameAndBadgeWrapper>

        <UserEmail>{user.email}</UserEmail>
      </InfoWrapper>

      <CTAWrapper>{ctas}</CTAWrapper>
    </Wrapper>
  );
};

export default AppCard;
