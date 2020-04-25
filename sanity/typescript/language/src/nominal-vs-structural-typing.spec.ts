/* eslint-disable @typescript-eslint/no-empty-interface */
import {Pass, checks} from '@cleric/common';
import {Fail, check, checkExtends} from '@cleric/common/src/ts-toolbelt/Test';

describe('structural typing', () => {
  it('is the default', () => {
    interface Animal {}

    interface Cat extends Animal {}

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
       * when they share exactly the same properties.
       */
      check<{foo: string}, {foo: string}, Pass>(),
      check<{foo: string; bar: string}, {foo: string}, Fail>(),
      /**
       * Also, a type is assignable to another if it contains all the properties
       * of the other type.
       */
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
       * However, now an Animal is NOT assignable to Cat.
       * Because Animal is missing the '__cat' discriminator.
       */
      checkExtends<Animal, Cat, Fail>(),
    ]);
  });
});

describe('classes', () => {
  it('behave nominally runtime, but are structural at the type-level', () => {
    class Animal {}
    class Cat extends Animal {}

    /**
     * Classes can have their inheritence hierarchy determined at runtime.
     *
     * E.g. we can determine the type of a class instance at runtime with
     * 'instanceof'.
     */
    expect(new Animal() instanceof Animal).toBe(true);
    expect(new Cat() instanceof Cat).toBe(true);
    /**
     * And a Cat is an instanceof Animal.
     */
    expect(new Cat() instanceof Animal).toBe(true);
    /**
     * But an Animal is not necessarily an instanceof a Cat.
     */
    expect(new Animal() instanceof Cat).toBe(false);

    /**
     * Even though class hierarchies can be determined at runtime and behave
     * nominally, at the type level, they are still structural.
     */
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
