import { IMutationApi, Mutation, Mutator } from './store';
import { DeepPartial } from 'utility-types';

class MutatorNode<T> implements IMutationApi<T> {
  path: string[];

  constructor(protected mutations: Mutation[], parent?: MutatorNode<any>, name?: string) {
    this.path = parent && name ? [...parent.path, name] : [];
  }
  $set = (state: T) => this.mutations.push({ path: this.path, state, type: 'SET' });

  $merge = (state: DeepPartial<T>) =>
    this.mutations.push({ path: this.path, state, type: 'MERGE' });

  $delete = () => this.mutations.push({ path: this.path, state: undefined, type: 'DELETE' });
}

const createProxy = (mutations: Mutation[], mutator: MutatorNode<any>) => {
  return new Proxy(mutator, {
    get: (target, key, receiver) => {
      if (!Reflect.has(target, key)) {
        const name = key.toString();
        const proxy = createProxy(mutations, new MutatorNode(mutations, mutator, name));
        Reflect.set(target, key, proxy, receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  });
};

export const createMutator = <T>(): [Mutation[], Mutator<T>] => {
  const mutations: Mutation[] = [];
  const mutator = new MutatorNode(mutations);
  const proxy = (createProxy(mutations, mutator) as unknown) as Mutator<T>;
  return [mutations, proxy];
};
