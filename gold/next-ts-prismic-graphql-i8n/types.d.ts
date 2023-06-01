declare module "apollo-link-prismic" {
    import { ApolloLink } from "@apollo/client";

    export class PrismicLink extends ApolloLink {
        constructor(args: { uri: string, authorization?: string });
    }
}