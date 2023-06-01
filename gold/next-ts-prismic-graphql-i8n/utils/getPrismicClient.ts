import { graphqlEndpoint as uri } from '../prismic-configuration';
import { PrismicLink } from 'apollo-link-prismic';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const link = new PrismicLink({ uri });

export const prismicClient = new ApolloClient({ link, cache: new InMemoryCache() });
