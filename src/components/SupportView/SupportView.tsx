import * as React from 'react';

import { Wrapper } from './SupportView.css';

import WindowHeader from '../WindowHeader';

enum Stage {
  default = 'default',
  success = 'success',
  failure = 'failure',
}

interface Props {
  handleClose: () => void;
  handleSubmit: () => void;
}

interface State {
  stage: Stage;
}

class SupportView extends React.Component<Props, State> {
  render() {
    return (
      <Wrapper>
        <WindowHeader>Contact Support</WindowHeader>
      </Wrapper>
    );
  }
}

export default SupportView;
