// @ts-ignore

import * as openfinLayouts from 'openfin-layouts';
import { ContentManager } from './ContentManager';
import { TrayWindowManager } from './TrayWindowManager';

/**
 * @class WindowManager Handles all Window Related Functionality
 */
export class WindowManager {
  private static INSTANCE: WindowManager;

  private application: fin.OpenFinApplication = fin.desktop.Application.getCurrent();
  private window: fin.OpenFinWindow = fin.desktop.Window.getCurrent();
  private trayIsOpen = false;

  /**
   * @member hotBarHeight The height of the hotbar when minimized.  Rounded up to the nearest 10th.  Real value is 67. 70 Used due to bug.
   */
  private readonly hotBarHeight = 70;

  constructor() {
    if (WindowManager.INSTANCE) {
      return WindowManager.INSTANCE;
    }

    this.setWindowDefaults();

    WindowManager.INSTANCE = this;

    /*
         * Sets trayIsOpen based on the window height
         * (This needs to be here to stop drag and drop breaking when
         * the window is reloaded while the tray is expanded)
         */
    this.trayIsOpen = window.innerHeight > this.hotBarHeight ? true : false;
  }

  /**
   * @method setWindowDefaults Sets default window attributes and Event Listeners
   */
  private setWindowDefaults(): void {
    openfinLayouts.deregister();
    this.createEventListeners();
  }

  /**
   * @method createEventListeners Creates Windows Event Listeners
   */
  private createEventListeners(): void {
    // @ts-ignore openfin type incorrectly handling windowResized param
    this.window.addEventListener(
      'bounds-changed',
      this.windowResized.bind(this),
    );
    this.window.addEventListener(
      'close-requested',
      this.handleWindowClose.bind(this),
    );
    this.window
      .getNativeWindow()
      .addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  /**
   * @method handleUnload Fires before the DOM is unloaded.
   * Removes the current tray icon, then allows the reload to continue
   */
  private async handleUnload() {
    const trayWindowManager = TrayWindowManager.instance;

    await trayWindowManager.destroyTrayWindow();

    return;
  }

  /**
   * @method handleWindowClose Fires when the window is attempted to be closed
   */
  private handleWindowClose(): void {
    this.window.minimize();
    this.moveTray(false);
  }

  /**
   * @method windowResized Fires on the windows bounds-changed event
   * @param e fin.WindowsBoundsEvent
   */
  private windowResized(e: fin.WindowBoundsEvent): void {
    this.trayIsOpen = e.height > this.hotBarHeight ? true : false;
  }

  /**
   * @method toggleTray Toggles the tray open or close depending on current state.
   */
  toggleTray(): void {
    this.moveTray(this.trayIsOpen ? false : true);
  }

  /**
   * @method openTray Opens the tray regardless of current state.
   */
  openTray(): void {
    this.moveTray(true);
  }

  /**
   * @method closeTray Closes the tray regardless of current state.
   */
  closeTray(): void {
    this.moveTray(false);
  }

  /**
   * @method moveTray Opens or Closes the tray based on param.
   * @param open True if the tray should open, False if should close.
   */
  private moveTray(open: boolean): void {
    // 67px = top bar, 96 = row height, 20 = footer space
    this.window.animate(
      {
        size: {
          height: open ? this.calculateTrayHeight() : 67,
          duration: 100,
        },
      },
      { interrupt: false },
    );
  }

  /**
   * @method calculateTrayHeight Calculates the height that the tray should stretch out to.
   */
  private calculateTrayHeight(): number {
    let numRows = Math.ceil(ContentManager.instance.getTrayApps.length / 4);

    if (numRows > 4) {
      numRows = 4;
    }

    return 67 + numRows * 96 + 50;
  }

  /**
   * @method isTrayOpen Returns if the tray is currently open or not.
   * @returns boolean
   */
  get isTrayOpen(): boolean {
    return this.trayIsOpen;
  }

  closeWindow(): void {
    this.window.close();
  }

  /**
   * @method instance returns the Window Manager INSTANCE
   * @returns WindowManager
   */
  static get instance(): WindowManager {
    if (WindowManager.INSTANCE) {
      return WindowManager.INSTANCE;
    } else {
      return new WindowManager();
    }
  }
}
