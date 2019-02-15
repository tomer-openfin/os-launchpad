import * as React from 'react';

import { Image, LogoWrapper } from './ImagePreview.css';

export interface Props {
  className?: string;
  imgSrc: string;
  size?: number;
}

interface State {
  draggedOver: boolean;
}

const ImagePreview = ({ className, imgSrc, size = 90 }: Props) => {
  return (
    <LogoWrapper size={size} className={className}>
      <Image size={size} imgSrc={imgSrc} />
    </LogoWrapper>
  );
};

export default ImagePreview;
