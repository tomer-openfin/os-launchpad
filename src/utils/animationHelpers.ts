export const scaleAndFadeIn = (ScaleComponent, transitionName: string, transitionDuration: number, size: number, margin: string) => {
  const shortTransitionDuration = (transitionDuration / 3) * 2;
  const longTransitionDuration = transitionDuration / 3;
  const easingCurve = 'ease-in-out';

  return `
    &.${transitionName}-enter {
      height: 0;
      width: 0;
      margin: 0;

      ${ScaleComponent} {
        opacity: 0;
        transform: scale(0.7);
      }
    }
    &.${transitionName}-enter-active {
      height: ${size}px;
      width: ${size}px;
      margin: ${margin};
      transition: all ${longTransitionDuration}ms ${easingCurve};

      ${ScaleComponent} {
        opacity: 1;
        transform: scale(1);
        transition: all ${shortTransitionDuration}ms ${easingCurve} ${longTransitionDuration}ms;
      }
    }
    &.${transitionName}-enter-done {
      height: ${size}px;
      width: ${size}px;
      margin: ${margin};

      ${ScaleComponent} {
        opacity: 1;
        transform: scale(1);
      }
    }
    &.${transitionName}-exit {
      height: ${size}px;
      width: ${size}px;
      margin: ${margin};

      ${ScaleComponent} {
        opacity: 1;
        transform: scale(1);
      }
    }
    &.${transitionName}-exit-active {
      height: 0;
      width: 0;
      margin: 0;
      transition: all ${longTransitionDuration}ms ${easingCurve} ${shortTransitionDuration}ms;

      ${ScaleComponent} {
        opacity: 0;
        transform: scale(0.7);
        transition: all ${shortTransitionDuration}ms ${easingCurve};
      }
    }
    &.${transitionName}-exit-done {
      height: 0;
      width: 0;
      margin: 0;

      ${ScaleComponent} {
        opacity: 0;
        transform: scale(0.7);
      }
    }
  `;
};
