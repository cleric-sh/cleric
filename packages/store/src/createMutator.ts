import {DeepPartial} from 'utility-types';

import {MutationApiI, Mutation, Mutator} from './store';

class MutatorNode<T> implements MutationApiI<T> {
  path: string[];

  constructor(
    protected mutations: Mutation[],
    parent?: MutatorNode<any>,
    name?: string
  ) {
    this.path = parent && name ? [...parent.path, name] : [];
  }
  $set = (state: T) =>
    this.mutations.push({path: this.path, state, type: 'SET'});

  $merge = (state: DeepPartial<T>) =>
    this.mutations.push({path: this.path, state, type: 'MERGE'});

  $delete = () =>
    this.mutations.push({path: this.path, state: undefined, type: 'DELETE'});
}

const createMutatorProxy = <T>(
  mutations: Mutation[],
  mutator: MutatorNode<T>
): Mutator<T> => {
  return (new Proxy(mutator, {
    get: (target, key, receiver) => {
      if (!Reflect.has(target, key)) {
        const name = key.toString();
        const proxy = createMutatorProxy(
          mutations,
          new MutatorNode(mutations, mutator, name)
        );
        Reflect.set(target, key, proxy, receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  }) as unknown) as Mutator<T>;
};

export const createMutator = <T>(): [Mutation[], Mutator<T>] => {
  const mutations: Mutation[] = [];
  const mutator = new MutatorNode<T>(mutations);
  const proxy = createMutatorProxy(mutations, mutator);
  return [mutations, proxy];
};
