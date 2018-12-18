import { ThemeProps } from 'styled-components';

import { Theme } from '../../types/commons';

export const getBackgroundColor = props => (props as ThemeProps<Theme>).theme.backgroundColor;
