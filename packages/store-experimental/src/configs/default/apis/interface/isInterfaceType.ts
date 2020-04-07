import * as t from 'io-ts';

export const isInterfaceType = (
  type: t.Any
): type is t.InterfaceType<t.Props> => type instanceof t.InterfaceType;
