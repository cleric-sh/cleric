const { syncContext } = require('../index');

if(!process.env.CIRCLECI_TOKEN) {
    console.log(`Env var 'CIRCLECI_TOKEN' not provided. Set it in '.env' before syncing contexts.`)
    console.log(` - Get (or create) your CIRCLECI_TOKEN from your user settings page in CircleCI.`)
}

syncContexts(process.env.CIRCLECI_TOKEN, 'github/cleric-sh', __dirname+'/contexts', ['CLERIC']);
