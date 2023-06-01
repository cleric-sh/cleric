import config from '../.graphqlrc';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { getIntrospectionQuery } from 'graphql';
import qgl from 'graphql-tag';
import { prismicClient } from '../utils/getPrismicClient';

const _writeFile = promisify(writeFile);

const getSchema = async () => {
    const introspectionQuery = getIntrospectionQuery();
    const result = await prismicClient.query({
        query: qgl`${introspectionQuery}`,
    });

    await _writeFile(config.schema, JSON.stringify(result.data, null, 2));
    console.log('Done!');
}

getSchema();
