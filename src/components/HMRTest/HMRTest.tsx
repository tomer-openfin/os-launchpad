import * as React from 'react';

import Button from '../Button';
import { Title } from './';

interface State {
  counter: number;
}

class HMRTest extends React.Component<{}, State> {
  interval?: number;

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(this.handleIncrement, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    return (
      <div>
        <Title>App</Title> {this.state.counter}
        <Button onClick={this.handleIncrement}>Increment</Button>
      </div>
    );
  }
}

export default HMRTest;
