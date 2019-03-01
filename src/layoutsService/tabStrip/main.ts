import * as layouts from 'openfin-layouts';
import { TabActivatedEvent, TabAddedEvent, TabPropertiesUpdatedEvent, TabRemovedEvent } from 'openfin-layouts/dist/client/tabbing';
import { TabGroupMaximizedEvent, TabGroupRestoredEvent } from 'openfin-layouts/dist/client/tabstrip';

import { TabManager } from './TabManager';

let tabManager: TabManager;

tabManager = new TabManager();

/**
 * Creates event listeners for events fired from the openfin layouts service.
 */
const createLayoutsEventListeners = () => {
  layouts.tabbing.addEventListener('tab-added', (event: TabAddedEvent) => {
    tabManager.addTab(event.identity, event.properties, event.index);

    document.title = tabManager.getTabs.map(tab => tab.PROPERTIES.title).join(', ');
  });

  layouts.tabbing.addEventListener('tab-removed', (event: TabRemovedEvent) => {
    tabManager.removeTab(event.identity);

    document.title = tabManager.getTabs.map(tab => tab.PROPERTIES.title).join(', ');
  });

  layouts.tabbing.addEventListener('tab-activated', (event: TabActivatedEvent) => {
    tabManager.setActiveTab(event.identity);
  });

  layouts.tabbing.addEventListener('tab-properties-updated', (event: TabPropertiesUpdatedEvent) => {
    const tab = tabManager.getTab(event.identity);
    const props = event.properties;

    if (tab) {
      if (props.icon) tab.updateIcon(props.icon);
      if (props.title) tab.updateText(props.title);
    }

    document.title = tabManager.getTabs.map(t => t.PROPERTIES.title).join(', ');
  });

  const maximizeElem: HTMLElement = document.getElementById('window-button-maximize')!;

  layouts.tabstrip.addEventListener('tab-group-maximized', (event: TabGroupMaximizedEvent) => {
    tabManager.isMaximized = true;
    maximizeElem.classList.add('restore');
  });

  layouts.tabstrip.addEventListener('tab-group-restored', (event: TabGroupRestoredEvent) => {
    tabManager.isMaximized = false;
    if (maximizeElem.classList.contains('restore')) {
      maximizeElem.classList.remove('restore');
    }
  });
};

/**
 * Creates Event Listeners for window controls (close, maximize, minimize, etc);
 */
const createWindowUIListeners = () => {
  const minimizeElem: HTMLElement = document.getElementById('window-button-minimize')!;
  const maximizeElem: HTMLElement = document.getElementById('window-button-maximize')!;
  const closeElem: HTMLElement = document.getElementById('window-button-exit')!;
  const undockElem: HTMLElement = document.getElementById('window-button-undock')!;

  // Minimize Button
  minimizeElem.onclick = () => {
    layouts.tabbing.minimizeTabGroup(tabManager.getTabs[0].ID);
  };

  // Maximize / Restore button
  maximizeElem.onclick = () => {
    if (!tabManager.isMaximized) {
      layouts.tabbing.maximizeTabGroup(tabManager.getTabs[0].ID);

      maximizeElem!.classList.add('restore');
    } else {
      layouts.tabbing.restoreTabGroup(tabManager.getTabs[0].ID);

      if (maximizeElem!.classList.contains('restore')) {
        maximizeElem!.classList.remove('restore');
      }
    }
  };

  // Close Button
  closeElem.onclick = () => {
    layouts.tabbing.closeTabGroup(tabManager.getTabs[0].ID);
  };

  // Undock button
  undockElem.onclick = () => {
    layouts.snapAndDock.undockWindow();
  };
};

createLayoutsEventListeners();
createWindowUIListeners();
