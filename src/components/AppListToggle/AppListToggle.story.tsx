import { action } from '@storybook/addon-actions';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppIconSizes } from '../../types/enums';
import { CATEGORIES } from '../../utils/storyCategories';

import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../AppIcon';
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
    const size = select('size', Object(AppIconSizes), AppIconSizes.Medium);
    const margin = number('margin', 10);
    const isExpanded = boolean('isExpanded', false);
    const isDisabled = boolean('isDisabled', false);
    const onClick = action('AppListToggle clicked');

    return (
      <Wrapper margin={margin} size={size}>
        <AppListToggle isDisabled={isDisabled} isExpanded={isExpanded} margin={`${margin}px`} onClick={onClick} size={size} />
      </Wrapper>
    );
  })
  .add('with transition', () => {
    const size = select('size', Object(AppIconSizes), AppIconSizes.Medium);
    const margin = number('margin', 10);
    const isExpanded = boolean('isExpanded', false);
    const isDisabled = boolean('isDisabled', false);
    const isMounted = boolean('isMounted', true);
    const onClick = action('AppListToggle clicked');

    const propsList = isMounted
      ? [
          {
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
