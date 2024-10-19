import { useApolloClient } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMeQuery } from "../gql-generated/__graphql__";
// import * as Apollo from '@apollo/client';

const Navbar = () => {
  const { data, loading, error, updateQuery } = useMeQuery();
  const router = useRouter();
  const client = useApolloClient();

  const logoutUser = async () => {
    localStorage.removeItem("token");
    client.cache.modify({
      fields: {
        me(existing) {
          return null;
        },
      },
    });
  };

  let body;

  const loginUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/google`.replace(
    "/graphql",
    ""
  );
  const login = () => {
    router.push(loginUrl);
  };

  if (loading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <Button onClick={login}>
          <Heading mr={2} fontSize={"medium"}>
            Login
          </Heading>
        </Button>
      </>
    );
  } else {
    body = (
      <>
        <Button marginRight={4} onClick={logoutUser}>
          Logout
        </Button>
        <Heading fontSize={"medium"}>{data.me.name}</Heading>
      </>
    );
  }

  return (
    <Box
      textAlign={"right"}
      bg="gray.50"
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      padding={4}
      paddingRight={20}
    >
      {body}
    </Box>
  );
};

export default Navbar;
