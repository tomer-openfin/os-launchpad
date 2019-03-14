export const ADMIN_FORMS_TRANSITION_CLASSNAMES = 'admin-forms-transition';
export const ADMIN_FORMS_ENTER_DURATION = 300;
export const ADMIN_FORMS_EXIT_DURATION = 400;
export const ADMIN_FORMS_EASING_FUNCTION = 'ease-in-out';
export const sharedAdminFormsCSSTransitionProps = {
  classNames: ADMIN_FORMS_TRANSITION_CLASSNAMES,
  timeout: { enter: ADMIN_FORMS_ENTER_DURATION, exit: ADMIN_FORMS_EXIT_DURATION },
  unmountOnExit: true,
};
