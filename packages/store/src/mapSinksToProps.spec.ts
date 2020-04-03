import {BehaviorSubject, Subject} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {mapSinksToProps} from './mapSinksToProps';

describe('mapSinksToProps', () => {
  it('should return an object with next functions mapped', () => {
    const MyActions = {
      first: new Subject(),
      second: new BehaviorSubject<boolean>(false),
    };
    const sinkProps = mapSinksToProps(MyActions);

    MyActions.first.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(1);
    });

    MyActions.second.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(2);
    });

    sinkProps.first({});
    sinkProps.second(true);

    MyActions.first.complete();
    MyActions.second.complete();
  });
});
