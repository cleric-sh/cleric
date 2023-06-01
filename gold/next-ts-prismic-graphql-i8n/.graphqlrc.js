const yaml = require('js-yaml');
const fs = require('fs');
const prismic = require('./prismic-configuration');

const {schema, documents} = yaml.load(fs.readFileSync('./.graphql-let.yml', { encoding: 'utf-8'}));

module.exports = {
    schema,
    documents,
    extensions: {
      endpoints: {
        default: {
          url: prismic.graphqlEndpoint,
          // headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
        },
      }, 
    }
}