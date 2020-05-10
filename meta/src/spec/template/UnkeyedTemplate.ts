import {Placeholder} from './Placeholder';
import {PlaceholderExports} from './PlaceholderExports';
import {Template} from './Template';

export type UnkeyedTemplate<TPlaceholders extends Placeholder[]> = Template<
  PlaceholderExports<TPlaceholders>
>;
