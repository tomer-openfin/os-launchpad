import windows from '../src/config/windows';

export const DEFAULT_HEIGHT = 478;
export const DEFAULT_WIDTH = 510;

export const getWindowViewports = () => {
  const reduceBase = {
    defaultWindowSize: {
      name: 'DefaultWindowSize',
      styles: {
        height: DEFAULT_HEIGHT + 'px',
        width: DEFAULT_WIDTH + 'px',
      },
    },
  };

  return Object.keys(windows).reduce((acc: typeof reduceBase, key: string) => {
    const el = windows[key];
    if (el.defaultHeight === DEFAULT_HEIGHT && el.defaultWidth === DEFAULT_WIDTH) {
      return acc;
    }

    return {
      ...acc,
      [el.name || key]: {
        name: el.name || '',
        styles: {
          height: (el.defaultHeight || 200) + 'px',
          width: (el.defaultWidth || 200) + 'px',
        },
      },
    };
  }, reduceBase);
};
