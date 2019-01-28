import { action } from '@storybook/addon-actions';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { LauncherSize } from '../../types/enums';
import { CATEGORIES } from '../../utils/storyCategories';

import { launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../LauncherAppIcon';
import AppListToggle from './AppListToggle';

const Wrapper = ({ children, margin, size }) => (
  <div
    style={{
      alignItems: 'center',
      display: 'inline-flex',
      height: `${2 * margin + size}px`,
      justifyContent: 'center',
      width: `${2 * margin + size}px`,
    }}
  >
    {children}
  </div>
);

storiesOf(`${CATEGORIES.COMPONENTS}AppListToggle`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherSize = select('size', Object(LauncherSize), LauncherSize.Large);
    const margin = number('margin', 10);
    const isExpanded = boolean('isExpanded', false);
    const isDisabled = boolean('isDisabled', false);
    const onClick = action('AppListToggle clicked');
    const launcherSizeConfig = launcherSizeConfigs[launcherSize];

    return (
      <Wrapper margin={margin} size={launcherSizeConfig.appIcon}>
        <AppListToggle
          borderWidth={launcherSizeConfig.appIconBorder}
          isDisabled={isDisabled}
          isExpanded={isExpanded}
          margin={`${margin}px`}
          onClick={onClick}
          size={launcherSizeConfig.appIcon}
        />
      </Wrapper>
    );
  })
  .add('with transition', () => {
    const launcherSize = select('size', Object(LauncherSize), LauncherSize.Large);
    const margin = number('margin', 10);
    const isExpanded = boolean('isExpanded', false);
    const isDisabled = boolean('isDisabled', false);
    const isMounted = boolean('isMounted', true);
    const onClick = action('AppListToggle clicked');
    const launcherSizeConfig = launcherSizeConfigs[launcherSize];
    const size = launcherSizeConfig.appIcon;

    const propsList = isMounted
      ? [
          {
            borderWidth: launcherSizeConfig.appIconBorder,
            hasTransition: true,
            isDisabled,
            isExpanded,
            margin: `${margin}px`,
            onClick,
            size,
          },
        ]
      : [];

    return (
      <Wrapper margin={margin} size={size}>
        <TransitionGroup component={null}>
          {propsList.map(props => (
            <CSSTransition classNames={APP_ICON_TRANSITION_CLASSNAMES} key="AppListToggle" timeout={APP_ICON_TRANSITION_DURATION} unmountOnExit>
              <AppListToggle {...props} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Wrapper>
    );
  });
