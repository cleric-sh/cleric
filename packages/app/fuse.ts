import { fusebox } from 'fuse-box';

const fuse = fusebox({
    homeDir: '../',
    entry: 'app/src/index.ts',
    devServer: true,
    webIndex: true,
    logging: {
        level: "verbose",
    }
});

fuse.runDev();