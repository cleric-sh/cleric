2020-03-12: 
Decided to drop the plugin architecture for now. Getting the typings right seems to require Higher Kinded Types, which aren't supported in typescript.

2020-03-13:
Decided to go ahead with the plugin architecture after all, since I finally got my head around HKT. Used a mirror of fp-ts's HKT implementation to construct API types.

2020-03-15:
Decided to create a static configuration system for APIs, so that the API configuration type can be left out of Slice and API types. This provides significantly cleaner typing for slice nodes.

Decided to try an use mixins for API plugins, since they are prototypical. 
 - This means that properties that APIs define can be defined only once (on the prototype), rather than instantiated for each node.
 - This shouldn't effect the prettiness of the typings intellisense.
 - This would enable each API to use 'this' semantically.
 - Mixins produce a class constructor, so rather than building a new anonymous class for each node, we can cache them and look them up my matching API keys.

Decided that I should be able to configure the base type of the Store node and Slice node.
 - This will allow the mechanism for read/write to be pluggable. E.g. I can create an 'Immer' Store, that uses immer for mutations, or others.
 - Apis can check the type of the Store and Slice node, and throw errors if they aren't what is expected.

Decided I need to write some proper unit tests before I start to mess around with converting the objects to mixin classes.

2020-03-18:
Decided mixins won't work, because they don't support scoping for composition. The problem is that all mixins will have the same arguments. In the case of the intersection api, which is composed of subtypes, this means that the other matching apis it delegates to will receive the parent type instead of their subtype.

Update: It's possible that mixins still have a place, in the sense that they could be used to create constructors for nodes with compound behavior around parent types, and they could be used in conjunction with decorators, which are always applied by SliceNode in the constructor. In this way, multi-type behavior that needs to be scoped could be achieved with a decorator, and isomorphic behavior could be kept in the mixin/class definition.

Decided to make SliceNode 'parent aware' and configure its own '$' property from the parent's.

2020-04-03:
Revisting the case of IntersectionApi... there doesn't really seem to be a reasonable scenario where an Intersection type would need to be explicitly merged from the APIs matching its subTypes.
It's most intuitive to consider it as the end resulting type and decorate it accordingly.
In the case where an intersection node might need to be treated as one of its subtypes (why though?) it could easily be cast, or a cast operator implemented.
This opens up the possibility of using mixins again, and keeping each decorator agnostic of the node it's being merged into.

Brainstorming how to solve the deep instantiation problem:

1. Typescript 3.9 seems to solve it, maybe due to the heavy speed optimizations introduced in it. However, I think that the fact that the error exists points to complexity that could be simplified.

2. The lookups around HKT probably have a lot to do with it. Questions:
 - do I need the HKT lookups in all of these scenarios? 
 - might mixins help the performance any?
 - can I pass a config interface into the store directly and pass that down
 - can I pass along a 'context' object that has all the HKT lookups already resolved?

 2020-04-04:
 Reached out to @gcanti (fp-ts and io-ts) and @pirix-gh (ts-toolbelt) for advice in optimizing performance.
 Made aware of `extends infer X` syntax that defers evaluation of types, and can avoid the `exessively deep` type problem.

 Decided to switch back to mixins, because:
  - it's the best representation of an api that is agnostic of the slice it's being created on.
  - the APIs can all be prepared ahead of time as constructors/prototypes (faster initialization).
  - it locks each node's type... e.g. the problem we had with IntersectionApi before actually isn't a problem.
    - e.g. in what scenario do we actually want a single node to be treated as different types anyway?
    - The APIs for each of the intersected types should all match the resulting type anyway!

 Decided to use deferred evaluation on Slice, because that would defer evaluation of child properties' types. This should make browsing a slice's child properties more performant.

 Decided to resolve the Config before passing to the HKT lookup functions. Simplify the api lookup to just use the basic Union.