import { ThemeProps } from 'styled-components';

import { Theme } from '../../redux/types';

export const getBackgroundColor = props => (props as ThemeProps<Theme>).theme.backgroundColor;
