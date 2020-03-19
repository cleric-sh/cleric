import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey, getConfig } from '../config';
import { Slice } from './Slice';

// Import the default configuration, so that it's always available.
import '../configs/default';
import { SliceNode } from './SliceNode';
import { SliceTypes } from '.';
import { Constructor } from '@cleric/common/src/types';
import { SliceKey } from './SliceKey';

const Slices: Partial<SliceTypes<t.Any>> = {}

export const createSliceNodeCtor = <TSliceNode extends Constructor<SliceNode<t.Any>>>(sliceKey: string, sliceNodeCtor: TSliceNode) => {
  Slices[sliceKey] = sliceNodeCtor;
  return sliceNodeCtor;
}

export const getSliceNodeCtor = <TSliceKey extends SliceKey, T extends t.Any>(sliceKey: TSliceKey, type: T) => {
  const slice = Slices[sliceKey];
  if (!slice)
    throw `Slice constructor '${sliceKey} is missing, have you forgotten to add it to the 'Slices' interface, or are you missing an import?'`;
  return slice as SliceTypes<T>[TSliceKey];
};


export const createSlice = <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
  type: T,
  $: Observable<t.TypeOf<T>>,
  configKey?: TConfiguration,
) => {
  const configKeyOrDefault = configKey ?? 'Default';
  const config = getConfig(configKeyOrDefault);
  const SliceNodeCtor = getSliceNodeCtor(config.slice, type);
  const slice = new SliceNodeCtor(type, $, configKeyOrDefault);
  return slice as Slice<TConfiguration, T>;
};
