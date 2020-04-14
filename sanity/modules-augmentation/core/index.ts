import {shared, Shared} from './shared';

export const getShared: () => Shared = () => shared as Shared;
