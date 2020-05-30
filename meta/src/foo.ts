import {refs} from '.';
import {t} from './spec/template/t';

export const foo = t`foo: ${t('foo')``}, bar: ${() => refs.bar.baz}`;
