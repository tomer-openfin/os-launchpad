import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { getNumberOrStringFromText, withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Tab from './Tab';
import Tabs, { defaultProps } from './Tabs';
import { TabsWithControlledState } from './utils';

storiesOf(`${CATEGORIES.UI}Tabs`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const numberOfTabs = number('numberOfTabs', 3, { range: false, min: 1, max: 50, step: 1 });
    const tabs: Array<{ children: string; id: string; title: string }> = [];
    for (let i = 1; i <= numberOfTabs; i++) {
      tabs.push({
        children: `Tab Content ${i}`,
        id: i.toString(),
        title: `Tab ${i}`,
      });
    }
    const activeId = number('activeId', 1, { range: false, min: 1, max: 50, step: 1 });
    const height = text('height', defaultProps.height.toString());

    return (
      <Tabs activeId={activeId.toString()} onClick={undefined} height={getNumberOrStringFromText(height)}>
        {tabs.map(({ children, ...rest }) => (
          <Tab key={rest.id} {...rest}>
            {children}
          </Tab>
        ))}
      </Tabs>
    );
  })
  .add('withControlledState', () => {
    const numberOfTabs = number('numberOfTabs', 3, { range: false, min: 1, max: 50, step: 1 });
    const tabs: Array<{ children: string; id: string; title: string }> = [];
    for (let i = 1; i <= numberOfTabs; i++) {
      tabs.push({
        children: `Tab Content ${i}`,
        id: i.toString(),
        title: `Tab ${i}`,
      });
    }
    const height = text('height', defaultProps.height.toString());

    return (
      <TabsWithControlledState height={getNumberOrStringFromText(height)}>
        {tabs.map(({ children, ...rest }) => (
          <Tab key={rest.id} {...rest}>
            {children}
          </Tab>
        ))}
      </TabsWithControlledState>
    );
  });
