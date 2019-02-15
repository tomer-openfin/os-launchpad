import { OrgImages } from '../redux/organization/types';

import * as Logo from '../assets/Logo.svg';

export const enum ManifestImageViewKeys {
  splashscreen = 'splashScreenImage',
  shortcut = 'shortcutIcon',
}

export interface ImagesFromManifest {
  [ManifestImageViewKeys.splashscreen]: string;
  [ManifestImageViewKeys.shortcut]: string;
}

export type OrgImageKey = keyof OrgImages | keyof ImagesFromManifest;

type OrgImageData = {
  [key in OrgImageKey & string]: {
    title: string;
    meta: string;
  }
};

/* tslint:disable:object-literal-sort-keys */
export const orgImageData: OrgImageData = {
  logo: { title: 'Launcher Logo', meta: '80x80' },
  loginLogo: { title: 'Login Logo', meta: ' 90x90' },
  [ManifestImageViewKeys.splashscreen]: { title: 'Splash Image', meta: ' 510x478' },
  [ManifestImageViewKeys.shortcut]: { title: 'App Shortcut', meta: ' 64x64' },
};

export const DEFAULT_LOGO = Logo;

export const imageDisplayName = (imageKey: OrgImageKey) => orgImageData[imageKey].title;

export const imageMetaInfo = (imageKey: OrgImageKey) => orgImageData[imageKey].meta;

export const isManifestImageKey = (imageKey: string) => imageKey === ManifestImageViewKeys.shortcut || imageKey === ManifestImageViewKeys.splashscreen;
