import * as React from 'react';

import { ContentWrapper, Tab, TabsWrapper, Wrapper } from './ImageUpload.css';

import Borders from '../Borders';
import ImageForm from '../ImageForm';
import WindowHeader from '../WindowHeader';

const FILE_UPLOAD = 'File Upload';
const BY_URL = 'By URL';

const TABS = [FILE_UPLOAD, BY_URL];

interface Props {
  handleCancel: () => void;
  headerText: string;
  height?: string;
  saveImage: (imgSrc: string) => void;
  width?: string;
  withoutFileUpload?: boolean;
  resetResponseError?: () => void;
  responseMessage?: string;
  responseError?: boolean;
}

type TabType = typeof TABS[number];

interface State {
  activeTab: TabType;
}

class ImageUpload extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.withoutFileUpload ? BY_URL : FILE_UPLOAD,
    };
  }

  setActiveTab = (tab: TabType) => () => this.setState({ activeTab: tab });

  renderTab = (tab: TabType) => (
    <Tab key={tab} active={this.state.activeTab === tab} onClick={this.setActiveTab(tab)}>
      {tab}
    </Tab>
  );

  render() {
    const { saveImage, handleCancel, headerText, height, width, withoutFileUpload, responseError, responseMessage, resetResponseError } = this.props;
    const { activeTab } = this.state;

    const tabs = withoutFileUpload ? TABS.filter(tab => tab !== FILE_UPLOAD) : TABS;

    return (
      <Wrapper height={height} width={width}>
        <Borders height="100%" width="100%">
          <WindowHeader label={headerText}>{headerText}</WindowHeader>

          <TabsWrapper>{tabs.map(this.renderTab)}</TabsWrapper>

          <ContentWrapper>
            <ImageForm
              byUrl={activeTab === BY_URL}
              saveImage={saveImage}
              handleCancel={handleCancel}
              responseError={responseError}
              message={`Image failed to save: ${responseMessage} Please try again.`}
              resetResponseError={resetResponseError}
            />
          </ContentWrapper>
        </Borders>
      </Wrapper>
    );
  }
}

export default ImageUpload;
