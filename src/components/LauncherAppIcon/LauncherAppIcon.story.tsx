import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppStatusStates } from '../../redux/apps/types';
import { AppIconSizes, DirectionalPosition } from '../../types/commons';
import { CATEGORIES } from '../../utils/storyCategories';
import LauncherAppIcon from './LauncherAppIcon';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from './LauncherAppIcon.css';

storiesOf(`${CATEGORIES.COMPONENTS}LauncherAppIcon`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const appStatusState = select('status', Object(AppStatusStates), AppStatusStates.Closed);
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const size = select('size', Object(AppIconSizes), AppIconSizes.Medium);
    const isDisabled = boolean('isDisabled', false);

    return (
      <LauncherAppIcon
        appId="osLaunchpadMain"
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
    const appStatusState = select('status', Object(AppStatusStates), AppStatusStates.Closed);
    const backgroundColor = text('AppIcon background-color', '#FFCC04');
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const size = select('size', Object(AppIconSizes), AppIconSizes.Medium);
    const margin = number('margin', 10);
    const isDisabled = boolean('isDisabled', false);
    const isMounted = boolean('isMounted', false);

    const icons = isMounted
      ? [
          {
            appId: 'osLaunchpadMain',
            appStatusState,
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
