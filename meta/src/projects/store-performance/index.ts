import {generate} from '../../generate';
import {d} from '../../spec/directory/d';
import {Api} from './Api';
import {Config} from './Config';
import {Root} from './Root';
import {Type} from './Type';

type Args = {numbers: number[]};

const Spec = (args: Args) => [
  d('types', [Root(args.numbers), ...args.numbers.map(Type)]),
  d('apis', [...args.numbers.map(Api)]),
  Config(args.numbers),
];

generate(
  '~/Projects/bernie/git/app/cleric/packages/store-performance/src/perf',
  Spec({numbers: [...Array(100).keys()].map(i => i + 1)}),
  false
);
