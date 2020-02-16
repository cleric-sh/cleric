import * as React from 'react';
import { SourceArgs, SinkArgs, SinkProps, ShapeFromSourceArgs } from '@cleric/store';
import { Subtract } from 'utility-types';
import { mapSinksToProps, mapSourcesToProps } from '@cleric/store';
import { Subscription } from 'rxjs';

export const connect = <TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs = {}>(
  sources: TSourceArgs,
  sinks?: TSinkArgs,
) => {
  type InjectedProps = ShapeFromSourceArgs<TSourceArgs> & SinkProps<TSinkArgs>;

  const sourceProps = mapSourcesToProps(sources);
  const sinkProps = sinks ? mapSinksToProps(sinks) : {};

  return <BaseProps extends InjectedProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Subtract<BaseProps, InjectedProps> & {
      // here you can extend hoc with new props
    };

    type HocState = ShapeFromSourceArgs<SourceArgs> & {
      // Extend HOC state here.
    };

    return class StoreConnectorHoc extends React.Component<HocProps, HocState> {
      // Enhance component name for debugging and React-Dev-Tools
      static displayName = `connect(${BaseComponent.name})`;

      // reference to original wrapped component
      static readonly WrappedComponent = BaseComponent;

      private subscription: Subscription;

      componentDidMount = () => {
        this.subscription = sourceProps.subscribe(this.onNext);
      };

      componentWillUnmount = () => {
        this.subscription.unsubscribe();
      };

      onNext = (state: HocState) => {
        this.setState(state);
      };

      render() {
        const props = {
          ...this.state,
          ...this.props,
          ...sinkProps,
        };

        return <BaseComponent {...((props as unknown) as BaseProps)} />;
      }
    };
  };
};
