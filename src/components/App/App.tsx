import * as React from 'react';

import { GlobalStyle } from '../../stylesheets/globals.css';
import Button from '../Button/Button';
import { Title } from './App.css';

interface State {
  counter: number;
}

class App extends React.Component<{}, State> {
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
        <GlobalStyle />
        <Title>App</Title> {this.state.counter}
        <Button onClick={this.handleIncrement} />
      </div>
    );
  }
}

export default App;
