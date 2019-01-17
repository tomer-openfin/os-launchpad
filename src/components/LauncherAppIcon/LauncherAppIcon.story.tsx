import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppIconSizes, AppStatusStates, DirectionalPosition } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from './LauncherAppIcon.css';

import LauncherAppIcon from './LauncherAppIcon';

storiesOf(`${CATEGORIES.COMPONENTS}LauncherAppIcon`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const appStatusState = select('Status', Object(AppStatusStates), AppStatusStates.Closed);
    const imgSrc = text('Image Url', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('Launcher Position', Object(DirectionalPosition), DirectionalPosition.Top);
    const size = select('Size', Object(AppIconSizes), AppIconSizes.Medium);
    const isDisabled = boolean('Disabled', false);
    const appTitle = text('Hover Title', 'Launchpad');

    return (
      <LauncherAppIcon
        appId="osLaunchpadMain"
        appTitle={appTitle}
        appStatusState={appStatusState}
        imgSrc={imgSrc}
        launcherPosition={launcherPosition}
        isDisabled={isDisabled}
        launchApp={action('launchApp clicked')}
        size={size}
      />
    );
  })
  .add('with animations', () => {
    const appStatusState = select('Status', Object(AppStatusStates), AppStatusStates.Closed);
    const backgroundColor = text('AppIcon Background Color', '#FFCC04');
    const imgSrc = text('Image Url', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('Launcher Position', Object(DirectionalPosition), DirectionalPosition.Top);
    const size = select('Size', Object(AppIconSizes), AppIconSizes.Medium);
    const margin = number('Margin', 10);
    const isDisabled = boolean('Disabled', false);
    const isMounted = boolean('Mounted', false);
    const appTitle = text('Hover Title', 'Launchpad');

    const icons = isMounted
      ? [
          {
            appId: 'osLaunchpadMain',
            appStatusState,
            appTitle,
            hasTransition: true,
            imgSrc,
            isDisabled,
            launchApp: action('launchApp clicked'),
            launcherPosition,
            margin: `${margin}px`,
            size,
          },
        ]
      : [];

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          height: `${2 * margin + size}px`,
          justifyContent: 'center',
          width: `${2 * margin + size}px`,
        }}
      >
        <div
          style={{
            backgroundColor,
            display: 'inline-flex',
          }}
        >
          <TransitionGroup component={null}>
            {icons.map(icon => (
              <CSSTransition classNames={APP_ICON_TRANSITION_CLASSNAMES} key={icon.appId} timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
                <LauncherAppIcon {...icon} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  });
