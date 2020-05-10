import {Placeholder} from './Placeholder';
import {PlaceholderExports} from './PlaceholderExports';
import {Template} from './Template';

export type KeyedTemplate<
  TKey extends string,
  TPhs extends Placeholder[]
> = Template<
  {
    [K in TKey]: PlaceholderExports<TPhs>;
  }
>;
