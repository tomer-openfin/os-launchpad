import * as React from 'react';

import { Asterisk, CTAWrapper, InfoWrapper, Meta, Title, Wrapper } from './ImageCard.css';

import ImagePreview from '../ImagePreview';

export interface Props {
  imgSrc: string;
  defaultImage?: boolean;
  ctas?: React.ReactNode;
  title: string;
  meta: string;
}

const ImageCard = ({ ctas, defaultImage, imgSrc, meta, title }: Props) => (
  <Wrapper>
    <ImagePreview size={45} imgSrc={imgSrc} />

    <InfoWrapper>
      <Title title={defaultImage ? 'Default Image' : ''}>
        {title}

        {defaultImage && <Asterisk>*</Asterisk>}
      </Title>

      <Meta>{meta}</Meta>
    </InfoWrapper>

    <CTAWrapper>{ctas}</CTAWrapper>
  </Wrapper>
);

export default ImageCard;
