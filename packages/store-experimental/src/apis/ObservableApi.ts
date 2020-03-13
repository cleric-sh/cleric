import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { SliceApi } from '.';

export const isAnyType = (type: t.Any): type is t.Any => type instanceof t.AnyType;

export const ObservableApi = SliceApi('Observable', isAnyType, (type, node) => node);

export type ObservableApi<T extends t.Any> = {
  $: Observable<t.TypeOf<T>>;
};

declare module '.' {
  export interface ApiTypes<T, A> {
    Observable: ObservableApi<A>;
  }
}
