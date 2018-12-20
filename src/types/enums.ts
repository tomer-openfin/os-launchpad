export enum AppIconSizes {
  Small = 30,
  Medium = 50,
  Large = 80,
}

export enum AppListTypes {
  App = 'app',
  Toggle = 'toggle',
}

// todo: use more general obj for sizes across all app
const obj = {
  [AppIconSizes.Small]: {
    caret: 'tbd',
    icon: 'tbd',
    logo: 'tbd',
    spacing: 'tbd',
  },
  [AppIconSizes.Medium]: {
    caret: 'tbd',
    icon: 45,
    logo: 76,
    spacing: 'tbd',
  },
  [AppIconSizes.Large]: {
    caret: 'tbd',
    icon: 'tbd',
    logo: 'tbd',
    spacing: 'tbd',
  },
};

export enum DirectionalPosition {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum ResponseStatus {
  SUCCESS = 'ok',
  FAILURE = 'error',
}
