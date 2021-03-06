# Higher Kinded Types

They are: Generic types without their parameters.

E.g. In `Foo<T>`, `Foo` is the Higher Kinded Type.

You can use a Higher Kinded Type (HKT) to construct a generic type. Sometimes they are described as 'type functions', or 'functions that return types'.

I asked a question about this stuff here:
https://stackoverflow.com/questions/60661599/in-typescript-can-i-parameterise-base-generic-types?noredirect=1#comment107324585_60661599

Currently, typescript doesn't support them natively, and doesn't seem to plan to either:
https://github.com/microsoft/TypeScript/issues/1213

However, 'fp-ts' has an implementation of higher kinded types that leverages module augmentation.
https://grossbart.github.io/fp-ts-recipes/#/hkt

The gist is that a generic interface is used with the same type parameters as the HKT, and a string literal is used to look up a property on that interface. So the string literal is passed around 'as the HKT'.