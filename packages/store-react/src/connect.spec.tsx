import { createStore } from '@cleric/store';
import { connect } from './connect';

describe('connect', () => {
  const store = createStore({
    myProp: 'my string',
  });
  it('connects', () => {
    connect({ myProps: store.myProp });
  });
});
