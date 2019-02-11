import * as CloseImg from '../assets/layouts-close.svg';
import * as DemaximizeImg from '../assets/layouts-demaximize.svg';
import * as MaximizeImg from '../assets/layouts-maximize.svg';
import * as MinimizeImg from '../assets/layouts-minimize.svg';
import * as UndockImg from '../assets/layouts-undock.svg';

const backgroundColor = '#121212';
const height = 37;
const buttonSize = 17;

const template = (title: string, position: string = 'fixed') => `
    <style type="text/css">
        @font-face {
            font-family: 'Nunito';
            font-style: normal;
            font-weight: 800;
            src: local('Nunito Regular'), local('Nunito-Regular'), url(https://fonts.gstatic.com/s/nunito/v9/XRXV3I6Li01BKofINeaBTMnFcQ.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
                U+2215, U+FEFF, U+FFFD;
        }

        .of-os-tb {
            -webkit-app-region: drag !important;
            font-family: 'Nunito', arial, sans-serif;
            z-index: 999999999;
            position: ${position};
            display: flex;
            height: ${height}px;
            top: 0;
            left: 0;
            width: 100%;
            background: ${backgroundColor};
            color: #FFFFFF;
            overflow: hidden;
            line-height: ${height}px;
            margin: 0 auto;
            letter-spacing: -0.08px;
            font-size: 12px;
            padding: 0 10px;
        }

        .of-os-tb-drag {
            flex: 1;
            min-width: 30px;
            overflow: hidden;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .of-os-tb-controls {
            align-items: center;
            display: flex;
        }

        .of-os-tb-btn {
            -webkit-app-region: no-drag !important;
            -webkit-mask-position: center;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: contain;
            background-color: #A7A7A7;
            border: none;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
            height: ${buttonSize}px;
            outline: none;
            overflow: hidden;
            padding: 0;
            text-indent: 100%;
            white-space: nowrap;
            width: ${buttonSize}px;
            z-index: 1000;
        }
        .of-os-tb-btn:hover {
            background-color: #FBC23C;
        }
        .of-os-tb-close:hover {
          background-color: #DF5353;
      }
        .of-os-tb-btn:active {
            background: #014f86;
        }

        .of-os-tb-btn + .of-os-tb-btn {
          margin-left: 2px;
        }

        .of-os-tb-close {
            -webkit-mask-image: url(${CloseImg});
        }
        .of-os-tb-maximize {
            -webkit-mask-image: url(${MaximizeImg});
        }
        .of-os-tb-maximize.invert {
          -webkit-mask-image: url(${DemaximizeImg});
        }
        .of-os-tb-minimize {
            -webkit-mask-image: url(${MinimizeImg});
        }
        .of-os-tb-undock {
            -webkit-mask-image: url(${UndockImg});
        }

        body {
            padding-top: ${height}px;
        }
    </style>
    <div class="of-os-tb">
        <div class="of-os-tb-drag">${title}</div>

        <div class="of-os-tb-controls">
          <button class="of-os-tb-btn of-os-tb-undock" title="Undock window">
            Undock
          </button>

          <button class="of-os-tb-btn of-os-tb-minimize" title="Minimize">
            Minimize
          </button>

          <button class="of-os-tb-btn of-os-tb-maximize" title="Maximize">
            Maximize
          </button>

          <button class="of-os-tb-btn of-os-tb-close" title="Close">
            Close
          </button>
        </div>
    </div>`;

export default template;
