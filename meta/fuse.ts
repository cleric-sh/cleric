import {fusebox, sparky} from 'fuse-box';

import path = require('path');

class Context {
  runServer = false;
  getConfig = () =>
    fusebox({
      cache: true,
      entry: './src/index.ts',
      hmr: true,
      logging: {
        level: 'verbose',
      },
      target: 'server',
      // watcher: {
      //   paths: [path.join(__dirname, '/src')],
      // },
      watcher: true,
    });
}

const {task} = sparky<Context>(Context);

task('default', async ctx => {
  ctx.runServer = true;
  const fuse = ctx.getConfig();
  await fuse.runDev();
});

task('preview', async ctx => {
  ctx.runServer = true;
  const fuse = ctx.getConfig();
  await fuse.runProd({uglify: false});
});

task('dist', async ctx => {
  ctx.runServer = false;
  const fuse = ctx.getConfig();
  // await fuse.runDev();
  await fuse.runProd({uglify: false});
});
