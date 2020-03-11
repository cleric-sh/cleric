import * as t from 'io-ts';
import { Observable, BehaviorSubject } from 'rxjs';
import { isArray } from 'lodash';
import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { pluck, filter } from 'rxjs/operators';

const one = t.type({ one: t.string });
const two = t.type({ two: t.number });

const union = t.union([one, two]);

const partial = t.partial({ maybe: t.string });

const schema = t.intersection([
  t.type({
    foo: t.string,
    bar: t.number,
    obj: t.type({
      val: t.string,
    }),
    union,
  }),
  partial,
]);

type ObservableNode<T extends t.Any> = {
  $: Observable<t.TypeOf<T>>;
};

type UnionNode<TCS extends t.Any[]> = {
  $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => Store<TSubType>;
};

type InterfaceNode<P> = {
  [K in keyof P]: P[K] extends t.Any ? Store<P[K]> : never;
};

type IntersectionNode<CS extends t.Any[]> = Union.Merge<
  Tuple.UnionOf<
    {
      [K in keyof CS]: Store<Cast<CS[K], t.Any>>;
    }
  >
>;

type Store<T extends t.Any> = ObservableNode<T> &
  (T extends t.UnionType<infer CS> ? UnionNode<CS> : {}) &
  (T extends t.IntersectionType<infer CS> ? IntersectionNode<CS> : {}) &
  (T extends t.InterfaceType<infer P> ? InterfaceNode<P> : {});

interface CreateNode {
  <T extends t.Any>(type: T, obs: Observable<t.TypeOf<T>>): Store<T>;
}

const createNode: CreateNode = (type, $) => {
  const node = {
    $,
    $type: type,
  };

  const addProperties = (type: t.InterfaceType<t.Any>) => {
    for (const name in type.props) {
      Object.defineProperty(node, name, {
        get: () => {
          const _name = '__' + name;
          if (!node[_name]) {
            const nextType = type.props[name];
            const next$ = $.pipe(pluck(name));
            node[_name] = createNode(nextType, next$);
          }
          return node[_name];
        },
      });
    }
  };

  if (type instanceof t.InterfaceType) addProperties(type);

  if (type instanceof t.IntersectionType) {
    for (const subType of type.types) {
      addProperties(subType);
    }
  }

  if (type instanceof t.UnionType) {
    if (!isArray(type.types)) throw 'This should never happen...';

    const types = type.types as t.Any[];
    const nodeCreators = types.map(t => () => {
      const option$ = $.pipe(filter(t.is));
      return createNode(t, option$);
    });
    const nodes: Store<any>[] = [];

    node['$is'] = (type: t.Any) => {
      const index = types.findIndex(t => t === type);
      if (index < 0) throw `Don't recognise this type...`;
      if (!nodes[index]) nodes[index] = nodeCreators[index]();
      return nodes[index];
    };
  }

  return node as any;
};

const src = new BehaviorSubject<t.TypeOf<typeof schema>>({
  bar: 1,
  foo: 'myString',
  obj: {
    val: 'valString',
  },
  union: {
    two: 123,
  },
});

const node = createNode(schema, src);

node.$.subscribe(p => console.log(p));
node.union.$is(two).$.subscribe(p => console.log(p));
