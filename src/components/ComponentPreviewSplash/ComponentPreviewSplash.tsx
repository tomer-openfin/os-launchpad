import * as React from 'react';

import { StyledImg } from './ComponentPreviewSplash.css';

interface Props {
  imageSrc: string;
}

const ComponentPreviewSplash = ({ imageSrc }: Props) => {
  return <StyledImg src={imageSrc} />;
};

export default ComponentPreviewSplash;
