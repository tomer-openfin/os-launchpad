import * as React from 'react';

import * as UploadIcon from '../../assets/Upload.svg';

import { Input, InputWrapper, Placeholder, Wrapper } from './ImageInput.css';

import ImagePreview from '../ImagePreview';

const FILE_ACCEPT = 'image/*';

interface Props {
  fileInputId?: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgSrc: string;
  name: string;
  previewSize?: number;
  placeholder?: string;
}

interface State {
  draggedOver: boolean;
}

class ImageInput extends React.PureComponent<Props, State> {
  state = {
    draggedOver: false,
  };

  handleDragEnter = () => {
    this.setState({ draggedOver: true });
  };

  handleDragExit = () => {
    this.setState({ draggedOver: false });
  };

  render() {
    const { imgSrc, name, placeholder, handleFileChange, fileInputId, previewSize = 100 } = this.props;
    const { draggedOver } = this.state;

    return (
      <Wrapper isActive={draggedOver}>
        <ImagePreview size={previewSize} imgSrc={imgSrc || UploadIcon} />

        <InputWrapper>
          <Placeholder>{placeholder || 'Drag & Drop a new image on top of the drop area to the left. Images should be jpg, png, or webp'}</Placeholder>

          <Input
            name={name}
            accept={FILE_ACCEPT}
            id={fileInputId}
            onChange={handleFileChange}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragExit}
            onDrop={this.handleDragExit}
            type="file"
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default ImageInput;
