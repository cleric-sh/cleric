import *as React from 'react';
import{createStore} from '@cleric/store';
import{connect, inject} from './connect';

describe(
    'connect', () = > {
      const store = createStore({
        myProp : 'my string',
      });

      it(
          'passes store props to nested component.', () = > {
            connect({myProps : store.myProp})(({myProps}) =
                                                  > <div>{myProps}</ div>);
          });

      it(
          'passes nested component extra props up to connected component.',
          () = > {
            interface Props {
            myProps:
              string;
            extra:
              number;
            blah:
              () = > void;
            }
            const Nested : React.FC<Props> = ({myProps, extra}) =
                > (<div>{myProps} {extra}</ div>);
            const Hoc =
                connect({myProps : store.myProp}, {blah : () = > {}})(Nested);
            const container = () = > <Hoc extra = {1} />;
          });

      it(
          'passes extra connected component props down to nested component.',
          () = > {
            const Hoc = connect({myProps : store.myProp}, {},
                                inject<{extra : number}>(), )(
                ({myProps, extra}) = > (<div>{myProps} {extra}</ div>));
            const container = () = > <Hoc extra = {1} />;
          });
    });
