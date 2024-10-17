import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";
// import { Post } from "../gql-generated/__graphql__";
import { IncomingHttpHeaders } from "http";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

const errorLink = onError((errors) => {
  console.log(222222222, errors);
  if (
    errors.graphQLErrors &&
    errors.graphQLErrors[0].extensions?.code === "UNAUTHENTICATED" &&
    errors.response
  ) {
    errors.response.errors = undefined;
    // Router.replace("/login");
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("token");
  //
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

console.log(process.env.NEXT_PUBLIC_SERVER_URL); // Server URL (must be absolute)
function createApolloClient(headers?: any) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([
      authMiddleware,
      errorLink,
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_SERVER_URL, // Server URL (must be absolute)
        // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        credentials: "include",
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // posts: {
            //   keyArgs: false,
            //   merge(existing, incoming) {
            //     let paginated_posts: Post[] = existing?.paginated_posts || [];
            //     if (incoming && incoming.paginated_posts) {
            //       paginated_posts = paginated_posts.concat(
            //         incoming.paginated_posts
            //       );
            //     }
            //     return { ...incoming, paginated_posts };
            //   },
            // },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState = null,
  headers?: IncomingHttpHeaders
) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ReturnType<typeof createApolloClient>,
  pageProps: { props: IApolloStateProps; revalidate: number }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
