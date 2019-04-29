import { User } from '../../types/commons';
import { memoizeOneInvalidateOnOtherArgs, memoizeSingleArg } from '../../utils/memoize';
import { defaultSortKey, State } from './AdminUsers';

export const filterUserList = memoizeOneInvalidateOnOtherArgs((search: State['search'], users: User[]) =>
  search
    ? users.filter(
        user =>
          user.firstName
            .concat(user.lastName)
            .concat(user.email)
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1,
      )
    : users,
);

export const sortUserDatum = memoizeSingleArg((sortKey: keyof User) => (userA: User, userB: User): 1 | -1 | 0 => {
  let A = userA[sortKey];
  let B = userB[sortKey];

  if (typeof A === 'string' && typeof B === 'string') {
    A = A.toUpperCase();
    B = B.toUpperCase();

    if (A < B) return -1;
    if (A > B) return 1;
  } else if (typeof A === 'boolean' && typeof B === 'boolean') {
    if (A > B) return -1;
    if (A < B) return 1;
  }

  if (sortKey !== defaultSortKey) {
    return sortUserDatum(defaultSortKey)(userA, userB);
  }

  return 0;
});
