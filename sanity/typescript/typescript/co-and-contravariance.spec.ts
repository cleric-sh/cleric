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

  /**
   * In this case, Cat and Dog are 'more specific' types than Animal.
   * Animal only contains '_animal: void', whereas
   * Cat contains '_animal: void' and '_cat: void'.
   */
  it('is the opposite of normal assignability (covariance)', () => {
    /**
     * Ordinarily, objects experience 'covariance' and assignability is
     * as you would expect.
     *
     * They behave, logically, as you would expect 'sets' to behave.
     *
     * More specific types are assignable to less specific types.
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
     * We encounter contravariance when we have a type argument on an 'input' type.
     * E.g. the expected type on the argument of a function.
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
       * a function that 'handles' all kinds of Animal.
       */
      checkExtends<TakeCat, TakeAnimal, Fail>(),
      checkExtends<TakeDog, TakeAnimal, Fail>(),

      /**
       * And a function that 'handles' any kind of Animal CAN be replace a function
       * that 'handles' only Cat (or Dog).
       *
       * In contravariance, types with args of less specific types are assignable to
       * types with args of more specific types.
       *
       */
      checkExtends<TakeAnimal, TakeCat, Pass>(),
      checkExtends<TakeAnimal, TakeDog, Pass>(),

      /**
       * And, of course, a function that can 'handle' all kinds of Animal can
       * be replaced by another function that 'handles' Animals.
       */
      checkExtends<TakeAnimal, TakeAnimal, Pass>(),

      /**
       * It's also useful to think of it from the consumer's perspective:
       *
       * I'm asking for a function that takes Cats and returns nothing (void).
       * I'm going to be passing Cats to this function.
       * I need to know that whatever function is provided can 'handle' Cats.
       * Functions that handle Animals can also handle Cats.
       * Functions that only handle Dogs can not handle Cats.
       */
    ]);
  });
});
