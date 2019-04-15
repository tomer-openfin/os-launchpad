import * as React from 'react';

import { StyledTab, Wrapper } from './ImageUpload.css';

import Borders from '../Borders';
import ImageForm from '../ImageForm';
import Tabs, { Props as TabProps } from '../Tabs';
import WindowHeader from '../WindowHeader';

const FILE_UPLOAD = 'File Upload';
const BY_URL = 'By URL';

const TABS = [FILE_UPLOAD, BY_URL];

interface Props {
  handleCancel: () => void;
  headerText: string;
  height?: string;
  resetResponseError?: () => void;
  responseError?: boolean;
  responseMessage?: string;
  saveImage: (imgSrc: string) => void;
  width?: string;
  withoutFileUpload?: boolean;
}

type TabType = typeof TABS[number];

interface State {
  activeTab: TabType;
}

class ImageUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: props.withoutFileUpload ? BY_URL : FILE_UPLOAD,
    };
  }

  setActiveTab = (tab: TabType) => this.setState({ activeTab: tab });

  renderTab = (tab: TabType): React.ReactElement<TabProps> => {
    const { handleCancel, resetResponseError, responseError, responseMessage, saveImage } = this.props;
    const { activeTab } = this.state;

    return (
      <StyledTab key={tab} id={tab} title={tab}>
        <ImageForm
          byUrl={activeTab === BY_URL}
          handleCancel={handleCancel}
          message={`Image failed to save: ${responseMessage} Please try again.`}
          resetResponseError={resetResponseError}
          responseError={responseError}
          saveImage={saveImage}
        />
      </StyledTab>
    );
  };

  render() {
    const { headerText, height, width, withoutFileUpload } = this.props;
    const { activeTab } = this.state;

    const tabs = withoutFileUpload ? TABS.filter(tab => tab !== FILE_UPLOAD) : TABS;

    return (
      <Wrapper height={height} width={width}>
        <Borders height="100%" width="100%">
          <WindowHeader label={headerText}>{headerText}</WindowHeader>

          <Tabs activeId={activeTab} height={30} onClick={this.setActiveTab}>
            {tabs.map(this.renderTab)}
          </Tabs>
        </Borders>
      </Wrapper>
    );
  }
}

export default ImageUpload;
