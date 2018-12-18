/**
 * Get window name from whicheever window instance this is called from.
 */
export default () => {
  const { fin } = window;
  return fin ? fin.desktop.Window.getCurrent().name : window.name;
};
