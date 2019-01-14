import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';

import { Animator, bounceKeyframe, scaleDownKeyframe, scaleUpKeyframe } from './LoadingAnimator.css';

export enum LoadingAnimatorStatus {
  Default,
  Starting,
  Animating,
  Ending,
}

interface Props {
  children: React.ReactNode;
  direction: DirectionalPosition;
  loading?: boolean;
}

interface State {
  status: LoadingAnimatorStatus;
}

class LoadingAnimator extends React.Component<Props, State> {
  animatingCount: number;

  endImmediately: boolean;

  shouldEnd: boolean;

  constructor(props: Props) {
    super(props);

    this.state = {
      status: props.loading ? LoadingAnimatorStatus.Starting : LoadingAnimatorStatus.Default,
    };

    this.animatingCount = 0;
    // End immediately will skip the animating phase
    this.endImmediately = false;
    // Should end will signal to animation iteration that it should transition to next animation
    this.shouldEnd = false;
  }

  componentDidUpdate(prevProps: Props) {
    // Going from a non-loading state to a loading state
    if (!prevProps.loading && this.props.loading) {
      this.setState({
        status: LoadingAnimatorStatus.Starting,
      });
    }

    // Going from a loading state to a non-loading state
    if (prevProps.loading && !this.props.loading) {
      // If the starting animation has not ended, immediately transition to ending animation
      if (this.state.status === LoadingAnimatorStatus.Starting) {
        this.endImmediately = true;
        this.shouldEnd = true;
      } else {
        this.shouldEnd = true;
      }
    }
  }

  handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    const { direction } = this.props;

    // Starting Animation has ended
    if (scaleDownKeyframe.getName() === e.animationName) {
      if (this.endImmediately) {
        this.setState({
          status: LoadingAnimatorStatus.Ending,
        });
      } else {
        this.setState({
          status: LoadingAnimatorStatus.Animating,
        });
      }
    } else if (scaleUpKeyframe(this.animatingCount, direction).getName() === e.animationName) {
      // Ending Animation has ended
      this.resetState();
    }
  };

  handleAnimationIteration = (e: React.AnimationEvent<HTMLDivElement>) => {
    const { direction } = this.props;

    if (e.animationName === bounceKeyframe(direction).getName()) {
      this.animatingCount = this.animatingCount + 1;
    }

    if (e.animationName === bounceKeyframe(direction).getName() && this.shouldEnd) {
      this.setState({
        status: LoadingAnimatorStatus.Ending,
      });
    }
  };

  resetState = () => {
    this.animatingCount = 0;
    this.endImmediately = false;
    this.shouldEnd = false;
    this.setState({
      status: LoadingAnimatorStatus.Default,
    });
  };

  render() {
    const { children, direction } = this.props;
    const { status } = this.state;

    return (
      <Animator
        animatingCount={this.animatingCount}
        direction={direction}
        onAnimationEnd={this.handleAnimationEnd}
        onAnimationIteration={this.handleAnimationIteration}
        status={status}
      >
        {children}
      </Animator>
    );
  }
}

export default LoadingAnimator;
