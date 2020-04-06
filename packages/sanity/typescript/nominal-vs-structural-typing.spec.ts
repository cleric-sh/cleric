/* eslint-disable @typescript-eslint/no-empty-interface */
import {checks, Pass} from '@cleric/common';
import {checkExtends, check, Fail} from '@cleric/common/src/ts-toolbelt/Test';

describe('structural typing', () => {
  interface Animal {}

  interface Cat extends Animal {}
  it('is the default', () => {
    checks([
      /**
       * Normally, we expect that Cat extends Animal.
       * A Cat is an Animal.
       */
      checkExtends<Cat, Animal, Pass>(),

      /**
       * However, not all Animals are Cats, so we expect the opposite
       * isn't true.
       *
       * So why, then, are we able to assign an Animal to a Cat in this case?
       */
      checkExtends<Animal, Cat, Pass>(),

      /**
       * The answer is because both classes share the same structure,
       * an empty object.
       */
      checkExtends<{}, Cat, Pass>(),
      checkExtends<{}, Animal, Pass>(),

      /**
       * This is called structural typing, and under it two types are the same
       * when they share the same properties.
       *
       * Also, a type is assignable to another if it contains all the properties
       * of the other type.
       */
      check<{foo: string}, {foo: string}, Pass>(),
      checkExtends<{foo: string; bar: string}, {foo: string}, Pass>(),
    ]);
  });
});

describe('nominal typing', () => {
  it('can be achieved with discriminators', () => {
    /**
     * We can achieve nominal typing by providing each type
     * with a discriminator that makes it 'unique'.
     *
     * E.g. the __animal and __cat properties below.
     */
    interface Animal {
      __animal: string;
    }

    interface Cat extends Animal {
      __cat: string;
    }

    checks([
      /**
       * As expected, Cat still extends Animal.
       */
      checkExtends<Cat, Animal, Pass>(),

      /**
       * However, now an Animal is not assignable to Cat.
       * Because Animal is missing the '__cat' discriminator.
       */
      checkExtends<Animal, Cat, Fail>(),
    ]);
  });

  it('doesnt work on classes, without a discriminator', () => {
    /**
     * Even though classes are types that can be determined
     * at runtime, they are not nominal.
     *

     */
    class Animal {}

    class Cat extends Animal {}

    checks([
      /**
       * As expected, Cat still extends Animal.
       */
      checkExtends<Cat, Animal, Pass>(),

      /**
       * But Animal can still be assigned to Cat,
       * because they share the same structure.
       *
       * The fact that they are classes, doesn't matter.
       */
      checkExtends<Animal, Cat, Pass>(),
    ]);
  });
});
