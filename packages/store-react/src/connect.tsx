import * as React from 'react';
import { SourceObject, SourceMap, SinkMap, SinkProps, FlatSourceProps } from '@cleric/store';
import { Subtract } from 'utility-types';
import { mapSinksToProps, mapSourcesToProps } from '@cleric/store';
import { Subscription } from 'rxjs';

export const connect = <TSinkMap extends SinkMap, TSourceSpec extends SourceObject>(
  sources: SourceMap<TSourceSpec>,
  sinks: TSinkMap,
) => {
  type InjectedProps = TSourceSpec & SinkProps<TSinkMap>;

  const sinkProps = mapSinksToProps(sinks);
  const sourceProps = mapSourcesToProps(sources);

  return <BaseProps extends InjectedProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Subtract<BaseProps, InjectedProps> & {
      // here you can extend hoc with new props
    };

    type HocState = FlatSourceProps<SourceMap<TSourceSpec>> & {
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

        return <BaseComponent {...(props as BaseProps)} />;
      }
    };
  };
};
