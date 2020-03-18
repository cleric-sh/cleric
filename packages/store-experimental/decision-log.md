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