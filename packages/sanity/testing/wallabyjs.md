# Wallabyjs

Wallabyjs supports automatic configuration, which means that you shouldn't need a wallaby.config.js file in most cases.

It assumes that you have a working jest configuration and it runs that. Basically, if you can't ´yarn run jest´ then wallaby won't work either.

One gotcha with typescript is that if you have both a working jest configuration with ts-jest, and a tsconfig.json in your root folder, wallabyjs will execute your tests much, much mnore slowly for some reason. I speculate that this is because it sees the tsconfig.json and tries to transpile typescript to js, then runs the js through jest, which then tries to transpile it again through ts-jest.

If I rename the root tsconfig.json to something like tsconfig.base.json then testing is snappy.