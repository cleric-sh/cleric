/* eslint-disable */

describe('marius-method', () => {
  it('should do stuff', () => {
    /**
     * Based on Marius Schulz's pattern: https://mariusschulz.com/blog/mixin-classes-in-typescript
     */
    type Constructor<T = {}> = new (...args: any[]) => T;

    // Simple class
    class User {
      name = '';
    }
    type UserCtor = Constructor<User>;

    ////////////////////
    // Example mixins
    ////////////////////

    interface UserMixin {
      <TBase extends Constructor<User>>(Base: TBase): TBase;
    }

    const MyMixin: UserMixin = User =>
      class extends User {
        foo = 'blah';
      };
    const NewMixin = MyMixin(User);
    const myMixin = new NewMixin();
    // Using the Mixin interface guarantees a compatible type is returned,
    // but the return is typed as User, so we lose typing of the mixin properties.
    // myMixin.foo;

    // A mixin that adds a property
    const Timestamped = <TBase extends UserCtor>(User: TBase) =>
      class extends User {
        timestamp = Date.now();

        constructor(...args: any[]) {
          super(args);

          this.name = 'foo';

          console.log(this);
        }
      };

    // a mixin that adds a property and methods
    const Activatable = <TBase extends Constructor<User>>(User: TBase) =>
      class extends User {
        isActivated = false;

        activate() {
          this.isActivated = true;
        }

        deactivate() {
          this.isActivated = false;
        }
      };

    ////////////////////
    // Usage to compose classes
    ////////////////////

    // User that is Timestamped
    const TimestampedUser = Timestamped(User);

    // User that is Timestamped and Activatable
    const TimestampedActivatableUser = Timestamped(Activatable(User));

    ////////////////////
    // Using the composed classes
    ////////////////////

    const timestampedUserExample = new TimestampedUser();
    console.log(timestampedUserExample.timestamp);

    const timestampedActivatableUserExample = new TimestampedActivatableUser();
    console.log(timestampedActivatableUserExample.timestamp);
    console.log(timestampedActivatableUserExample.isActivated);
  });
});
