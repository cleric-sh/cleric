import {checks, Pass} from '@cleric/common';
import {checkExtends, Fail} from '@cleric/common/src/ts-toolbelt/Test';

describe('contravariance', () => {
  interface Animal {
    _animal: void;
  }

  interface Cat extends Animal {
    _cat: void;
  }

  interface Dog extends Animal {
    _dog: void;
  }

  it('is the opposite of normal assignability (covariance)', () => {
    /**
     * Ordinarily, objects experience covariance and assignability is
     * as you would expect.
     */
    checks([
      /**
       * A is assignable to B if A 'is a' B.
       *
       * E.g. every Cat 'is a' Animal.
       */
      checkExtends<Cat, Animal, Pass>(),
      checkExtends<Dog, Animal, Pass>(),
      /**
       * But not every Animal 'is a' Cat.
       */
      checkExtends<Animal, Cat, Fail>(),
      checkExtends<Animal, Dog, Fail>(),
      /**
       * And of course, a Cat 'is not a' Dog.
       */
      checkExtends<Cat, Dog, Fail>(),
    ]);

    /**
     * We encounter contravariance when we have a type restriction on an 'input' type.
     * E.g. the argument of a function.
     */
    type Take<TInput> = {
      (input: TInput): void;
    };

    /**
     * In this case, it's possible to create a few variants of the 'Take' function,
     * accepting different constraints on TInput.
     */
    type TakeCat = Take<Cat>; // Takes only Cats...
    type TakeDog = Take<Dog>; // Takes only Dogs...
    type TakeAnimal = Take<Animal>; // Takes any kind of Animal...

    checks([
      /**
       * In contravariance, assignability is reversed.
       *
       * Where normally Cat is assignable to Animal (since Cat is an Animal),
       * a function that accepts a Cat cannot be assigned to
       * a function that accepts an Animal.
       *
       * A good way to think of it is, "What does a function 'need' or 'handle'?"
       *
       * In other words, a function that 'handles' only Cats cannot replace
       * a function that needs to be able to 'handle' all kinds of Animal.
       */
      checkExtends<TakeCat, TakeAnimal, Fail>(),
      checkExtends<TakeDog, TakeAnimal, Fail>(),

      /**
       * And a function that 'handles' any kind of Animal CAN be replace a function
       * that accepts only Cat (or Dog).
       */
      checkExtends<TakeAnimal, TakeCat, Pass>(),
      checkExtends<TakeAnimal, TakeDog, Pass>(),

      /**
       * And, of course, a function that can 'handles' all kinds of Animal can
       * be replaced by another function that 'handles' Animals.
       */
      checkExtends<TakeAnimal, TakeAnimal, Pass>(),
    ]);
  });
});
