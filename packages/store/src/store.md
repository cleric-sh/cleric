# agnostic reactive store

Built unashamedly in Typescript for Typescript.

Framework agnostic state management that achieves the following goals:

- Unrestricted structure & granularity
- Atomic state
- Serializability
- Reactivity
- Immutability
- Value-based change detection
- Async-first
- Strong typing

In other words, no more redux, reselect, redux-observable, redux-saga. It's all contained in one paradigm.

## Features

- [*] Intuitive API that gets out of the way
- [*] Full flexibility to structure state data
- [*] Observe any point of the state graph
- [*] Hash-based (value-based) change detection built in (only emits real on real mutations)
- [*] Map observables to props object
- [*] Support for Arrays
- [*] Immutability
- [*] Mutate by 'set'
- [*] Mutate by 'merge'
- [*] Mutate by 'delete'
- [*] mapSourcesToProps
- [*] mapSinksToProps
- [ ] Support for union types
- [ ] Integrate with redux devtools & support time travel
- [ ] Support for basic data classes with computed properties.

## Getting started

Check out the test 'only emits changes when hash changes' in `/src/store/store.spec.ts` to play around with the store.

Try setting and merging values to make your subscriptions emit false changes.

## Tasks

- [ ] PERFORMANCE: Consider combining the graph of hashes and slices
  - CON: it might not be possible to preserve the serializability of the core state+hash in this approach. Computation for serialization/deserialization could be acceptable, though.
  - they can be created both by hash value, or by navigating via proxy. It shouldn't matter.
  - recursive set/merge/delete would then map new objects and recalculate hash at the same time, reducing tree traversals to one.
  - we probably wouldn't need monolite here either.
  - have path calculated lazily, therefore we minimize memory overhead per node - we only calculate path for nodes that are used.
- [ ] USABILITY: Create separate SliceNode types for Object and Scalar values. Don't expose $merge for scalar values.
- [ ] USABILITY: Create separate SliceNode type for Array, exposing common array-based actions.

## To test

### modules:

- [ ] Passing Hot Observable as source
- [ ] Passing Cold Observable as source
- [ ] Passing array as source
- [ ] Passing promise as source
