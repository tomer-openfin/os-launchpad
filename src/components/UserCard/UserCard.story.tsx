import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '../../utils/storyCategories';

import { UserStatus } from '../../types/enums';
import { ROUTES } from '../Router/consts';

import { Color } from '../../styles';
import { DeleteIconLink, EditIconLink, LinkWrapper } from '../AdminUsers';

import UserCard from './UserCard';

const userStatuses = {
  'Change Password': UserStatus.ChangePassword,
  'Confirmed': UserStatus.Confirmed,
};

const renderButtons = user => {
  return (
    <LinkWrapper>
      <EditIconLink to={{ pathname: ROUTES.ADMIN_USERS_EDIT, state: user }} />

      <DeleteIconLink to={{ pathname: ROUTES.ADMIN_USERS_DELETE, state: user }} />
    </LinkWrapper>
  );
};

const Wrapper = styled.div<{ withBorder: boolean }>`
  margin: 50px 0;
  border: 1px solid ${({ withBorder }) => (withBorder ? Color.COMET : Color.VOID)};
`;

storiesOf(`${CATEGORIES.ADMIN}UserCard`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const email = text('Email', 'John.Doe@gmail.com');
    const firstName = text('First Name', 'John');
    const lastName = text('Last Name', 'Doe');
    const status = select('Status', userStatuses, UserStatus.ChangePassword);
    const isAdmin = boolean('Admin', true);
    const withCtas = boolean('With Edit and Delete buttons', true);
    const wrapperBorder = boolean('Wrapper Border', false);

    const user = {
      created: '2018-10-26T14:02:10.964Z',
      email,
      enabled: true,
      firstName,
      id: 'username1',
      isAdmin,
      lastModified: '2018-12-19T15:28:00.147Z',
      lastName,
      middleInitial: 'M1',
      phone: '+1234 567 5555',
      status,
      username: 'username1',
    };

    return (
      <Wrapper withBorder={wrapperBorder}>
        <UserCard user={user} ctas={withCtas ? renderButtons(user) : null} />
      </Wrapper>
    );
  });
