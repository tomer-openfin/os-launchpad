import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { AppIconSizes } from '../../types/enums';
import { APP_ICON_TRANSITION_CLASSNAMES, APP_ICON_TRANSITION_DURATION } from '../AppIcon';
import AppListToggle from './AppListToggle';

const Wrapper = ({ children, backgroundColor, margin, size }) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor,
      display: 'inline-flex',
      height: `${2 * margin + size}px`,
      justifyContent: 'center',
      width: `${2 * margin + size}px`,
    }}
  >
    {children}
  </div>
);

storiesOf('Components/AppListToggle', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const parentBackgroundColor = text('Parent background-color', '#343434');
    const size = select('size', AppIconSizes, AppIconSizes.Medium);
    const margin = number('margin', 10);
    const isExpanded = boolean('isExpanded', false);
    const isDisabled = boolean('isDisabled', false);
    const onClick = action('AppListToggle clicked');

    return (
      <Wrapper backgroundColor={parentBackgroundColor} margin={margin} size={size}>
        <AppListToggle isDisabled={isDisabled} isExpanded={isExpanded} margin={`${margin}px`} onClick={onClick} size={size} />
      </Wrapper>
    );
  })
  .add('with transition', () => {
    const parentBackgroundColor = text('Parent background-color', '#343434');
    const size = select('size', AppIconSizes, AppIconSizes.Medium);
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
      <Wrapper backgroundColor={parentBackgroundColor} margin={margin} size={size}>
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
