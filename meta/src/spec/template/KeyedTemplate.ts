import {Placeholder} from './Placeholder';
import {PlaceholderExports} from './PlaceholderExports';
import {Template} from './Template';

export type KeyedTemplate<
  TKey extends string,
  TPlaceholders extends Placeholder[]
> = Template<
  {
    [K in TKey]: PlaceholderExports<TPlaceholders>;
  }
>;
