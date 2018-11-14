import { MAIN_WINDOW } from '../config/windows';

function setBounds(finWindow, position, measureX, measureY, offsetX, offsetY, autoHide) {
  if (!finWindow) return;

  const currentScreenObject = finWindow.getNativeWindow().screen;

  let leftPosition;
  let topPosition;
  let autoHideDelta;

  const SHOW_LAUNCHER_ADJUSTMENT = 5;

  switch (position) {
    case 'RIGHT': {
      autoHideDelta = autoHide ? measureX - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObject.availWidth - measureX + autoHideDelta - offsetY;
      topPosition = currentScreenObject.availHeight / 2 - measureY / 2 + offsetX;
      break;
    }
    case 'BOTTOM': {
      autoHideDelta = autoHide ? measureY - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObject.availWidth / 2 - measureX / 2 + offsetX;
      topPosition = currentScreenObject.height - measureY + autoHideDelta - offsetY;
      break;
    }
    case 'LEFT': {
      autoHideDelta = autoHide ? measureX - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = 0 - autoHideDelta + offsetY;
      topPosition = currentScreenObject.availHeight / 2 - measureY / 2 + offsetX;
      break;
    }
    case 'TOP':
    default: {
      autoHideDelta = autoHide ? measureY - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObject.availWidth / 2 - measureX / 2 + offsetX;
      topPosition = currentScreenObject.height - currentScreenObject.availHeight - autoHideDelta + offsetY;
    }
  }

  return finWindow.setBounds(leftPosition, topPosition, measureX, measureY);
}

// refactor this with promisified API and turn into getFinWindowById utility
function setWindowBounds(windowId, position, measureX, measureY, offsetX, offsetY, autoHide = false) {
  // fin.Application.getCurrent()
  const finApplication = fin.desktop.Application.getCurrent();

  let finWindow;

  if (windowId === MAIN_WINDOW) {
    finWindow = fin.desktop.Window.getCurrent();

    setBounds(finWindow, position, measureX, measureY, offsetX, offsetY, autoHide);
  } else {
    // TODO: refactor to use promisified verson of API
    finApplication.getChildWindows(windows => {
      finWindow = windows.find(window => {
        return window.name === windowId;
      });

      setBounds(finWindow, position, measureX, measureY, offsetX, offsetY, autoHide);
    });
  }
}

export default setWindowBounds;
