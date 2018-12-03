import { getIsEnterprise } from '../redux/application/index';

export const checkIsEnterprise = () => {
  const store = window.opener ? window.opener.store : window.store;
  const state = store.getState();
  return getIsEnterprise(state);
};
