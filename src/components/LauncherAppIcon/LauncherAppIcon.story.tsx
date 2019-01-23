import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppStatusStates, DirectionalPosition, LauncherSize } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from './LauncherAppIcon.css';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import LauncherAppIcon from './LauncherAppIcon';

storiesOf(`${CATEGORIES.COMPONENTS}LauncherAppIcon`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const appStatusState = select('Status', Object(AppStatusStates), AppStatusStates.Closed);
    const imgSrc = text('Image Url', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const isDisabled = boolean('Disabled', false);
    const appTitle = text('Hover Title', 'Launchpad');

    return (
      <LauncherAppIcon
        appId="osLaunchpadMain"
        appTitle={appTitle}
        appStatusState={appStatusState}
        imgSrc={imgSrc}
        launcherPosition={launcherPosition}
        launcherSizeConfig={launcherSizeConfigs[launcherSize]}
        isDisabled={isDisabled}
        launchApp={action('launchApp clicked')}
      />
    );
  })
  .add('with animations', () => {
    const appStatusState = select('Status', Object(AppStatusStates), AppStatusStates.Closed);
    const backgroundColor = text('AppIcon Background Color', '#FFCC04');
    const imgSrc = text('Image Url', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const margin = number('Margin', 10);
    const isDisabled = boolean('Disabled', false);
    const isMounted = boolean('Mounted', false);
    const appTitle = text('Hover Title', 'Launchpad');
    const launcherSizeConfig = launcherSizeConfigs[launcherSize];

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
            launcherSizeConfig,
            margin: `${margin}px`,
          },
        ]
      : [];

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          height: `${2 * margin + launcherSizeConfig.appIcon}px`,
          justifyContent: 'center',
          width: `${2 * margin + launcherSizeConfig.appIcon}px`,
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
