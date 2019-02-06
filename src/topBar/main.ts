import * as layouts from 'openfin-layouts';

window.addEventListener('DOMContentLoaded', () => {
    const title = document.title;

    const backgroundColor = '#3A3A3A';
    const textColor = '#FFFFFF';

    const basePath = 'https://cdn.openfin.co/demos/os-launchpad/';

    const minImg = `${basePath}minimize.svg`;
    const maxImg = `${basePath}maximize.svg`;
    const restoreImg = `${basePath}restore.svg`;
    const closeImg = `${basePath}close.svg`;
    const undockImg = `${basePath}undock.svg`;
    const dockImg = `${basePath}dock.svg`;

    const dockedTitle = 'window docked, click to undock.';
    const undockedTitle = 'window undocked.';

    const topBarHTML = `
    <style type="text/css">
        @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 400;
            src: local('Nunito Regular'), local('Nunito-Regular'), url(https://fonts.gstatic.com/s/nunito/v9/XRXV3I6Li01BKofINeaBTMnFcQ.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
                U+2215, U+FEFF, U+FFFD;
        }

        .of-os-tb {
            -webkit-app-region: drag;
            font-family: 'Nunito', arial, sans-serif;
            z-index: 999999999;
            position: absolute;
            display: flex;
            height: 35px;
            top: 0;
            left:0;
            width: 100%;
            background: ${backgroundColor};
            color: ${textColor};
            text-align: center;
            overflow: hidden;
            vertical-align: middle;
            line-height: 35px;
            margin: 0 auto;
            letter-spacing: 2px;
            font-size: 10px;
        }

        .of-os-tb-drag {
            margin: 0 auto;
        }

        .of-os-tb-btn {
            -webkit-app-region: no-drag;
            position: absolute;
            height: 20px;
            width: 20px;
            top: 7px;
            padding: 5px;
            opacity: 0.9;
            z-index: 1000;
            cursor: pointer;
            box-sizing: border-box;
            display: block;
        }
        .of-os-tb-btn:hover {
            background-color: #FBC23C;
            opacity: 1;
            border-radius: 3px;
        }
        .of-os-tb-btn:active {
            background: #014f86;
        }

        .of-os-tb-close {
            right: 7px;
        }
        .of-os-tb-maximize {
            right: 29px;
        }
        .of-os-tb-minimize {
            right: 51px;
        }
        .of-os-tb-undock {
            left: 7px;
            padding: 2px;
        }

        body {
            padding-top: 35px;
        }
    </style>
    <div class="of-os-tb">
        <img class="of-os-tb-btn of-os-tb-undock" src="${undockImg}" alt="" title="${undockedTitle}">
        <div class="of-os-tb-drag">${title}</div>
        <img class="of-os-tb-btn of-os-tb-minimize" src="${minImg}" alt="">
        <img class="of-os-tb-btn of-os-tb-maximize" src="${maxImg}" alt="">
        <img class="of-os-tb-btn of-os-tb-close" src="${closeImg}" alt="">
    </div>`;

    // add html to top of page
    document.body.insertAdjacentHTML('afterbegin', topBarHTML);
    // add event listeners to the top bar icons
    document.getElementsByClassName('of-os-tb-minimize')[0].addEventListener('click', () => {
        fin.desktop.Window.getCurrent().minimize();
    });
    document.getElementsByClassName('of-os-tb-close')[0].addEventListener('click', () => {
        fin.desktop.Application.getCurrent().close();
    });
    // maximize/restore
    let maximized = false;
    document.getElementsByClassName('of-os-tb-maximize')[0].addEventListener('click', e => {
        if (maximized === false) {
            fin.desktop.Window.getCurrent().maximize();
        } else {
            fin.desktop.Window.getCurrent().restore();
        }
        if (e.srcElement) {
            (e.srcElement as HTMLImageElement).src = (maximized) ? maxImg : restoreImg;
        }
        maximized = !maximized;
    });
    // configure layouts service
    fin.desktop.Window.getCurrent().getParentApplication().getManifest(mani => {
        const tabStripUrl = mani.startup_app.preloadScripts[0].url.replace('/topBar.js', '/tabStrip.js');
        layouts.setTabClient(tabStripUrl, {height: 35});
    });
    layouts.addEventListener('join-tab-group', () => {
        (document.getElementsByClassName('of-os-tb')[0] as HTMLElement).style.display = 'none';
    });
    layouts.addEventListener('leave-tab-group', () => {
        (document.getElementsByClassName('of-os-tb')[0] as HTMLElement).style.display = '';
    });
    layouts.addEventListener('join-snap-group', () => {
        const elem = document.getElementsByClassName('of-os-tb-undock')[0] as HTMLImageElement;
        elem.src = undockImg;
        elem.title = dockedTitle;
    });
    layouts.addEventListener('leave-snap-group', () => {
        const elem = document.getElementsByClassName('of-os-tb-undock')[0] as HTMLImageElement;
        elem.src = dockImg;
        elem.title = undockedTitle;
    });
    document.getElementsByClassName('of-os-tb-undock')[0].addEventListener('click', () => {
        layouts.undockWindow(fin.desktop.Window.getCurrent());
    });
});
