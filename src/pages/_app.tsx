import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../util/apollo-client";
import useFetchUser from "../hooks/useFetchMe";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const { user } = useFetchUser();
  console.log("_app", user);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
