import {Placeholder} from './Placeholder';

export class Template<TPlaceholders extends Placeholder[]> {
  constructor(public placeholders: TPlaceholders) {}
}

export class KeyedTemplate<
  TKey extends string,
  TPlaceholders extends Placeholder[]
> extends Template<TPlaceholders> {
  constructor(public key: TKey, public placeholders: TPlaceholders) {
    super(placeholders);
  }
}
