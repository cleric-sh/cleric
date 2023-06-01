const fs = require('fs');
const axios = require('axios');

async function getContexts(circleToken, ownerSlug) {
  const response = await axios.get('https://circleci.com/api/v2/context', {
    ...getConfig(circleToken),
    params: { 'owner-slug': ownerSlug }
  });

  return response.data;
}

async function listVariablesPage(circleToken, contextId, page_token) {
  const response = await axios.get(`https://circleci.com/api/v2/context/${contextId}/environment-variable`, {
    ...getConfig(circleToken),
    params: {
      'page-token': page_token
    }
  });
  return response.data;
}

async function listVariables(circleToken, contextId) {
  let current_page_token = undefined;
  let items = [];
  do {
    const {next_page_token, items: next_items} = await listVariablesPage(circleToken, contextId, current_page_token);
    current_page_token = next_page_token;
    items = [...items, ...next_items];
  }
  while(current_page_token);
  return items;
}

async function addOrUpdateVariable(circleToken, contextId, name, value) {
  const config = getConfig(circleToken);
  const response = await axios.put(`https://circleci.com/api/v2/context/${contextId}/environment-variable/${name}`, { value }, config);
  return response.data;
}

async function removeVariable(circleToken, contextId, name) {
  const config = getConfig(circleToken);
  await axios.delete(`https://circleci.com/api/v2/context/${contextId}/environment-variable/${name}`, config);
}

async function createContext(circleToken, ownerSlug, name) {
  const config = getConfig(circleToken);
  const response = await axios.post('https://circleci.com/api/v2/context', { owner: { slug: ownerSlug }, name }, config);
  return response.data;
}

async function tryGetContext(contexts, name) {
  return contexts.items.find(c => c.name === name);
}

async function getEnsureContext(circleToken, ownerSlug, contexts, name) {
  const context = await tryGetContext(contexts, name);
  return context ? context : createContext(circleToken, ownerSlug, name);
}

function replaceEnvVarValueIfExists(contextName, key, value) {
  const match = value.match(/\$(.*)/);
  if (match) {
    const envVarName = match[1];
    const valueFromProcess = process.env[envVarName];

    if (!valueFromProcess) {
      console.warn(` - '${key}': WARNING - expects value to be provided by env var '${envVarName}', but it wasn't.`);
    }

    return valueFromProcess;
  }
  return value;
}

async function syncVariables(circleToken, context, variables) {
  const {id, name} = context;
  const variablesInContext = await listVariables(circleToken, id);
  const keysInContext = variablesInContext.map(i => i.variable);
  const keysToSet = Object.getOwnPropertyNames(variables);

  for (const key of keysToSet) {
    let value = variables[key];

    value = replaceEnvVarValueIfExists(name, key, value) || '';

    const env_var = await addOrUpdateVariable(circleToken, id, key, value);
    console.log(` - '${env_var.variable}': set`);
  }

  const keysToRemove = keysInContext.filter(k => !keysToSet.find(s => s === k));

  for (const key of keysToRemove) {
    await removeVariable(id, key);
    console.log(` - '${key}': removed`);
  }
};

async function syncContext(circleToken, ownerSlug, contexts, name, variables) {
  const context = await getEnsureContext(circleToken, ownerSlug, contexts, name);
  await syncVariables(circleToken, context, variables);
}

function getConfig(token) {
  return {
    headers: {
      'Circle-Token': token
    },
  }
}

async function syncContexts(circleToken, ownerSlug, contextsDir) {

  const contexts = await getContexts(circleToken, ownerSlug);
  const paths = fs.readdirSync(contextsDir);
  const files = [], dirs = [];
  for(const path of paths) {
    const isDirectory = fs.lstatSync(`${contextsDir}/${path}`).isDirectory();
    if(isDirectory) dirs.push(path);
    else files.push(path);
  }
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  const envFiles = files.filter(f => f.endsWith('.env'));

  // If file is a json file.
  for(const file of jsonFiles) {

    const fileName = file.match(/(.*).json/)[1];
    const name = [...prefix, fileName].filter(f => !!f).join('_');
    const variables = require(`${contextsDir}/${file}`);

    console.log(`Syncing context '${name}' from file '${file}':`)
    await syncContext(circleToken, ownerSlug, contexts, name, variables);
    console.log(' ')
  }

  for(const file of envFiles) {
    const fileName = file.match(/(.*).env/)[1];
    const name = [...prefix, fileName].filter(f => !!f).join('_');

    const text = fs.readFileSync(`${contextsDir}/${file}`, { encoding: 'utf-8' });
    const lines = text.split('\n');
    const variables = lines.reduce((acc, line) => {
      line=line.trim();

      if(line.startsWith('#')) return acc;
      if(!line.match(/=/)) return acc;

      const [name, value] = line.split('=');
      if (!name) return acc;

      acc[name] = value;
      return acc;
    }, {})

    console.log(`Syncing context '${name}' from file '${file}':`)
    await syncContext(circleToken, ownerSlug, contexts, name, variables);
  }

  for(const dir of dirs) {
    syncContexts(circleToken, ownerSlug, `${contextsDir}/${dir}`, [...prefix, dir]);
  }

  console.log('Done!')
}

module.exports = {
    syncContexts
}
