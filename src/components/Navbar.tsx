import { useApolloClient } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMeQuery } from "../gql-generated/__graphql__";
import { useStore } from "../store/store";
// import * as Apollo from '@apollo/client';

const Navbar = () => {
  const { data, loading, error, updateQuery } = useMeQuery();
  const router = useRouter();
  // const client = useApolloClient();

  const { user, setUser } = useStore();

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setUser(null);
    // client.cache.modify({
    //   fields: {
    //     me(existing) {
    //       return null;
    //     },
    //   },
    // });
  };

  let body;

  // const loginUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/google`.replace(
  //   "/graphql",
  //   ""
  // );
  const login = () => {
    router.push("/api/auth/google");
  };

  if (loading) {
    body = null;
  } else if (!user) {
    // } else if (!data?.me) {
    body = (
      <>
        <Button onClick={login} colorScheme="blue" variant="solid">
          <Heading mr={0.5} fontSize={"medium"} color="white">
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
        <Heading fontSize={"medium"}>{user.name.toString()}</Heading>
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
      // paddingRight={20}
    >
      {body}
    </Box>
  );
};

export default Navbar;
