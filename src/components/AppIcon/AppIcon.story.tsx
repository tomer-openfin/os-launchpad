import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppIconSizes, DirectionalPosition } from '../../types/enums';
import AppIcon from './AppIcon';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from './AppIcon.css';

storiesOf('Components/AppIcon', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const imgSrc = text('imgSrc', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');
    const indicatorPosition = select('indicatorPosition', DirectionalPosition, DirectionalPosition.Bottom);
    const size = select('size', AppIconSizes, AppIconSizes.Medium);
    const isDisabled = boolean('isDisabled', false);

    return (
      <AppIcon
        appId="osLaunchpadMain"
        imgSrc={imgSrc}
        indicatorPosition={indicatorPosition}
        isDisabled={isDisabled}
        launchApp={action('launchApp clicked')}
        size={size}
      />
    );
  })
  .add('with parent background color', () => {
    const backgroundColor = text('Parent background-color', '#343434');
    const imgSrc = text('imgSrc', 'https://cdn.openfin.co/demos/whiteboard/apps/shared/image/favicon.ico');
    const indicatorPosition = select('indicatorPosition', DirectionalPosition, DirectionalPosition.Bottom);
    const size = select('size', AppIconSizes, AppIconSizes.Medium);
    const isDisabled = boolean('isDisabled', false);

    return (
      <div style={{ backgroundColor, display: 'inline-block' }}>
        <AppIcon
          appId="osLaunchpadMain"
          imgSrc={imgSrc}
          indicatorPosition={indicatorPosition}
          isDisabled={isDisabled}
          launchApp={action('launchApp clicked')}
          size={size}
        />
      </div>
    );
  })
  .add('with transition', () => {
    const parentBackgroundColor = text('Parent background-color', '#343434');
    const backgroundColor = text('AppIcon background-color', '#FFCC04');
    const imgSrc = text('imgSrc', 'https://cdn.openfin.co/demos/whiteboard/apps/shared/image/favicon.ico');
    const indicatorPosition = select('indicatorPosition', DirectionalPosition, DirectionalPosition.Bottom);
    const size = select('size', AppIconSizes, AppIconSizes.Medium);
    const margin = number('margin', 10);
    const isDisabled = boolean('isDisabled', false);
    const isMounted = boolean('isMounted', false);

    const icons = isMounted
      ? [
          {
            appId: 'osLaunchpadMain',
            backgroundColor,
            hasTransition: true,
            imgSrc,
            indicatorPosition,
            isDisabled,
            launchApp: action('launchApp clicked'),
            margin,
            size,
          },
        ]
      : [];

    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: parentBackgroundColor,
          display: 'inline-flex',
          height: `${2 * margin + size}px`,
          justifyContent: 'center',
          width: `${2 * margin + size}px`,
        }}
      >
        <TransitionGroup component={null}>
          {icons.map(icon => (
            <CSSTransition classNames={APP_ICON_TRANSITION_CLASSNAMES} key={icon.appId} timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
              <AppIcon {...icon} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  });
