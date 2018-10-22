import {ContentManager} from './js/ContentManager';
import {TrayWindowManager} from './js/TrayWindowManager';
import {WindowManager} from './js/WindowManager';

declare var window: Window&{WindowManager: WindowManager, ContentManager: ContentManager, TrayWindowManager: TrayWindowManager};

window.WindowManager = new WindowManager();
window.ContentManager = new ContentManager();
window.TrayWindowManager = new TrayWindowManager();