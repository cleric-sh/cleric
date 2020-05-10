import {Placeholder} from './Placeholder';
import {PlaceholderExports} from './PlaceholderExports';
import {KeyedTemplate, Template} from './Template';

export type TemplateExports<
  T extends Template<Placeholder[]>
> = T extends KeyedTemplate<infer Key, infer Phs>
  ? {[K in Key]: PlaceholderExports<Phs>}
  : T extends Template<infer Phs>
  ? PlaceholderExports<Phs>
  : never;
