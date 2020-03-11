/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { Observable, BehaviorSubject, from } from 'rxjs';
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
  $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => SliceNode<TSubType>;
};

type InterfaceNode<P> = {
  [K in keyof P]: P[K] extends t.Any ? SliceNode<P[K]> : never;
};

type IntersectionNode<CS extends t.Any[]> = Union.Merge<
  Tuple.UnionOf<
    {
      [K in keyof CS]: SliceNode<Cast<CS[K], t.Any>>;
    }
  >
>;

type SliceNode<T extends t.Any> = ObservableNode<T> &
  (T extends t.UnionType<infer CS> ? UnionNode<CS> : {}) &
  (T extends t.IntersectionType<infer CS> ? IntersectionNode<CS> : {}) &
  (T extends t.InterfaceType<infer P> ? InterfaceNode<P> : {});

interface CreateSlice {
  <T extends t.Any>($type: T, $: Observable<t.TypeOf<T>>): SliceNode<T>;
}

class Slice<T extends t.Any> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {}

  protected createProperties = (type: t.InterfaceType<t.Any>) => {
    for (const name in type.props) {
      Object.defineProperty(this, name, {
        get: () => {
          const _name = '__' + name;
          if (!this[_name]) {
            const nextType = type.props[name];
            const next$ = this.$.pipe(pluck(name));
            this[_name] = createSlice(nextType, next$);
          }
          return this[_name];
        },
      });
    }
  };
}

class InterfaceSlice<T extends t.InterfaceType<any>> extends Slice<T> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    this.createProperties($type);
  }
}

class IntersectionSlice<T extends t.IntersectionType<any>> extends Slice<T> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    if (!isArray(this.$type.types)) throw 'This should never happen...';
    for (const subType of this.$type.types) {
      this.createProperties(subType);
    }
  }
}

class UnionSlice<T extends t.UnionType<t.Any[]>> extends Slice<T> {
  private nodeCreators: Array<() => SliceNode<any>>;
  private nodes: SliceNode<any>[] = [];

  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    if (!isArray(this.$type.types)) throw 'This should never happen...';
    for (const subType of this.$type.types) {
      if (subType instanceof t.InterfaceType) {
        this.createProperties(subType);
      }
    }

    this.nodeCreators = this.$type.types.map(t => () => {
      const option$ = $.pipe(filter(t.is));
      return createSlice(t, option$);
    });
  }

  $is = (type: t.Any) => {
    const index = this.$type.types.findIndex(t => t === type);
    if (index < 0) throw `Don't recognise this type...`;
    if (!this.nodes[index]) this.nodes[index] = this.nodeCreators[index]();
    return this.nodes[index];
  };
}

const createSlice: CreateSlice = (type, $) => {
  if (type instanceof t.InterfaceType) return new InterfaceSlice<typeof type>(type, $);
  if (type instanceof t.IntersectionType) return new IntersectionSlice<typeof type>(type, $);
  if (type instanceof t.UnionType) return new UnionSlice<typeof type>(type, $);
  return new Slice(type, $);
};

const initial: t.TypeOf<typeof schema> = {
  bar: 1,
  foo: 'myString',
  obj: {
    val: 'valString',
  },
  union: {
    one: '123',
  },
};

const src = new BehaviorSubject(initial);

const node = createSlice(schema, src);

node.$.subscribe(p => console.log(p));
console.log(node.obj.val);
node.union.$is(two).$.subscribe(p => console.log(p));
node.union.$is(one).one.$.subscribe(p => console.log(p));
