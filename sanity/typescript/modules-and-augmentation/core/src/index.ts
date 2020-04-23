import {Shared, shared} from './shared';

export const getShared: () => Shared = () => shared as Shared;
