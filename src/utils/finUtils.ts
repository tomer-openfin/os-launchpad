import { UnPromisfy } from '../types/utils';

const getFin = () => {
  const { fin } = window;

  if (!fin) {
    throw new Error('fin not found on window');
  }

  return fin;
};

// Window
type FinWindow = typeof fin.Window;
type FinWindowMethods = Extract<keyof FinApplication, 'getCurrent' | 'wrap'>;
type FinWindowInstance = UnPromisfy<ReturnType<typeof fin.Window.wrap>>;
type FinWindowInstanceMethods = Extract<
  keyof FinWindowInstance,
  | 'addListener'
  | 'animate'
  | 'getBounds'
  | 'getGroup'
  | 'getInfo'
  | 'hide'
  | 'isShowing'
  | 'moveTo'
  | 'removeListener'
  | 'resizeTo'
  | 'setBounds'
  | 'updateOptions'
>;

// Static
const getWindowMethod = <T extends FinWindowMethods>(method: T): FinWindow[T] => {
  try {
    const fin = getFin();
    return (...args) => (fin.Window[method] as Function).call(fin.Window, ...args);
  } catch (e) {
    return (...args) => {
      // tslint:disable-next-line:no-console
      console.warn(`Error calling ${method} in Window with args`, ...args, '\nError:', e);
      return Promise.reject(e);
    };
  }
};

const wrapWindow = getWindowMethod('wrap');
const getCurrentWindow = getWindowMethod('getCurrent');

// Instance
const getWindowInstanceMethod = <T extends FinWindowInstanceMethods>(method: T) => (identity?: fin.Identity): FinWindowInstance[T] => async (...args) => {
  const finWindow = identity ? await wrapWindow(identity) : await getCurrentWindow();
  return (finWindow[method] as Function).call(finWindow, ...args);
};

export const addWindowListener = getWindowInstanceMethod('addListener');
export const animateWindow = getWindowInstanceMethod('animate');
export const getWindowBounds = getWindowInstanceMethod('getBounds');
export const getWindowGroup = getWindowInstanceMethod('getGroup');
export const getWindowInfo = getWindowInstanceMethod('getInfo');
export const hideWindow = getWindowInstanceMethod('hide');
export const isWindowShowing = getWindowInstanceMethod('isShowing');
export const moveWindowTo = getWindowInstanceMethod('moveTo');
export const removeWindowListener = getWindowInstanceMethod('removeListener');
export const resizeWindowTo = getWindowInstanceMethod('resizeTo');
export const setWindowBounds = getWindowInstanceMethod('setBounds');
export const updateWindowOptions = getWindowInstanceMethod('updateOptions');

// Application
type FinApplication = typeof fin.Application;
type FinApplicationMethods = Extract<keyof FinApplication, 'createFromManifest' | 'getCurrent' | 'wrap'>;
type FinApplicationInstance = UnPromisfy<ReturnType<typeof fin.Application.wrap>>;
type FinApplicationInstanceMethods = Extract<
  keyof FinApplicationInstance,
  'addListener' | 'close' | 'getChildWindows' | 'getInfo' | 'getManifest' | 'getWindow' | 'removeTrayIcon' | 'setTrayIcon'
>;

// Static
const getApplicationMethod = <T extends FinApplicationMethods>(method: T): FinApplication[T] => {
  try {
    const fin = getFin();
    return (...args) => (fin.Application[method] as Function).call(fin.Application, ...args);
  } catch (e) {
    return (...args) => {
      // tslint:disable-next-line:no-console
      console.warn(`Error calling ${method} in Application with args`, ...args, '\nError:', e);
      return Promise.reject(e);
    };
  }
};

export const createFromManifest = getApplicationMethod('createFromManifest');
// TODO - On upgrade to RVM v10, replace with the built in startFromManifest
export const startFromManifest: FinApplication['startFromManifest'] = async (...args) => {
  return createFromManifest(...args).then(async app => {
    await app.run();
    return app;
  });
};
const getCurrentApplication = getApplicationMethod('getCurrent');
const wrapApplication = getApplicationMethod('wrap');

// Instance
const getApplicationInstanceMethod = <T extends FinApplicationInstanceMethods>(method: T) => (identity: fin.Identity): FinApplicationInstance[T] => async (
  ...args
) => {
  const finApplication = identity ? await wrapApplication(identity) : await getCurrentApplication();
  return (finApplication[method] as Function).call(finApplication, ...args);
};

export const getApplicationChildWindows = getApplicationInstanceMethod('getChildWindows');
export const closeApplication = getApplicationInstanceMethod('close');
export const getApplicationInfo = getApplicationInstanceMethod('getInfo');
export const getApplicationManifest = getApplicationInstanceMethod('getManifest');
export const getApplicationWindow = getApplicationInstanceMethod('getWindow');
export const removeApplicationTrayIcon = getApplicationInstanceMethod('removeTrayIcon');
export const setApplicationTrayIcon = getApplicationInstanceMethod('setTrayIcon');

// System
type FinSystem = typeof fin.System;
type FinSystemMethods = Extract<
  keyof FinSystem,
  'addListener' | 'getAllWindows' | 'getMachineId' | 'getMonitorInfo' | 'getMousePosition' | 'launchExternalProcess' | 'removeListener' | 'showDeveloperTools'
>;

// Static
const getSystemMethod = <T extends FinSystemMethods>(method: T): FinSystem[T] => {
  try {
    const fin = getFin();
    return (...args) => (fin.System[method] as Function).call(fin.System, ...args);
  } catch (e) {
    return (...args) => {
      // tslint:disable-next-line:no-console
      console.warn(`Error calling ${method} in System with args`, ...args, '\nError:', e);
      return Promise.reject(e);
    };
  }
};

export const addSystemListener = getSystemMethod('addListener');
export const launchExternalProcess = getSystemMethod('launchExternalProcess');
export const getAllSystemWindows = getSystemMethod('getAllWindows');
export const getSystemMachineId = getSystemMethod('getMachineId');
export const getSystemMonitorInfo = getSystemMethod('getMonitorInfo');
export const getSystemMousePosition = getSystemMethod('getMousePosition');
export const removeSystemListener = getSystemMethod('removeListener');
export const showSystemDeveloperTools = getSystemMethod('showDeveloperTools');

// GlobalHotkey
type FinGlobalHotkey = typeof fin.GlobalHotkey;
type FinGlobalHotkeyMethods = Extract<keyof FinGlobalHotkey, 'register' | 'unregisterAll'>;

// Static
const getGlobalHotkeyMethod = <T extends FinGlobalHotkeyMethods>(method: T): FinGlobalHotkey[T] => {
  try {
    const fin = getFin();
    return (...args) => (fin.GlobalHotkey[method] as Function).call(fin.GlobalHotkey, ...args);
  } catch (e) {
    return (...args) => {
      // tslint:disable-next-line:no-console
      console.warn(`Error calling ${method} in GlobalHotkey with args`, ...args, '\nError:', e);
      return Promise.reject(e);
    };
  }
};

export const registerGlobalHotkey = getGlobalHotkeyMethod('register');
export const unregisterAllGlobalHotkey = getGlobalHotkeyMethod('unregisterAll');
