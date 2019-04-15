import * as React from 'react';

export interface PreventRenderProps {
  preventRender?: boolean;
}

const withRenderPrevention = <P extends PreventRenderProps>(Component: React.ComponentType<P>) =>
  class ComponentWithRenderPrevention extends React.Component<P> {
    shouldComponentUpdate(nextProps: PreventRenderProps) {
      return !nextProps.preventRender;
    }

    render() {
      return <Component {...this.props} />;
    }
  };

export default withRenderPrevention;
