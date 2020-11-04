import * as t from 'io-ts';

export const isIntersectionType = (
  type: t.Any
): type is t.IntersectionType<t.Any[]> => type instanceof t.IntersectionType;
