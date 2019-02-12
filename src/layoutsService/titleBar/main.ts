import * as layouts from 'openfin-layouts';

import template from './template';

window.addEventListener('DOMContentLoaded', async () => {
  const baseUrl = await new Promise<string>(resolve => {
    fin.desktop.Window.getCurrent()
      .getParentApplication()
      .getManifest(mani => {
        resolve(mani.startup_app.preloadScripts[0].url.replace('/titleBar.js', ''));
      });
  });

  const title = document.title;

  const titleBarHTML = template(baseUrl, title);

  // add html to top of page
  document.body.insertAdjacentHTML('afterbegin', titleBarHTML);
  // add onclick listeners to the title bar icons
  (document.getElementsByClassName('of-os-tb-minimize')[0] as HTMLButtonElement).onclick = () => {
    fin.desktop.Window.getCurrent().minimize();
  };
  (document.getElementsByClassName('of-os-tb-close')[0] as HTMLButtonElement).onclick = () => {
    fin.desktop.Application.getCurrent().close();
  };
  // maximize/restore
  let maximized = false;
  (document.getElementsByClassName('of-os-tb-maximize')[0] as HTMLButtonElement).onclick = e => {
    const demaximizeCls = 'invert';

    if (maximized === false) {
      fin.desktop.Window.getCurrent().maximize();
      if (e.target instanceof HTMLElement) {
        e.target.classList.add(demaximizeCls);
      }
    } else {
      fin.desktop.Window.getCurrent().restore();
      if (e.target instanceof HTMLElement) {
        e.target.classList.remove(demaximizeCls);
      }
    }

    maximized = !maximized;
  };
  // configure layouts service
  layouts.tabbing.setTabstrip({ url: `${baseUrl}/tabStrip.html`, height: 38 });

  layouts.tabbing.addEventListener('tab-added', () => {
    (document.getElementsByClassName('of-os-tb')[0] as HTMLElement).style.display = 'none';
  });
  layouts.tabbing.addEventListener('tab-removed', () => {
    (document.getElementsByClassName('of-os-tb')[0] as HTMLElement).style.display = '';
  });
  layouts.snapAndDock.addEventListener('window-docked', () => {
    (document.getElementsByClassName('of-os-tb-undock')[0] as HTMLButtonElement).style.display = '';
  });
  layouts.snapAndDock.addEventListener('window-undocked', () => {
    (document.getElementsByClassName('of-os-tb-undock')[0] as HTMLButtonElement).style.display = 'none';
  });
  (document.getElementsByClassName('of-os-tb-undock')[0] as HTMLButtonElement).onclick = () => {
    layouts.snapAndDock.undockWindow(fin.desktop.Window.getCurrent());
  };
});
