import { Button } from "@chakra-ui/react";

import { Form, Formik, FormikHelpers } from "formik";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSearchParams } from "next/navigation";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { TestResult } from "../components/TestResult";
import { useMeQuery } from "../gql-generated/__graphql__";
import { initializeApollo } from "../util/apollo-client";

import { isBrowser } from "../util/window";
import useFetchUser from "../hooks/useFetchMe";
import { useRouter } from "next/router";

const initial_values = {
  initial: 10_000,
  lost_v: 100,
  // lost_p: 1,
  profit_v: 150,
  // profit_p: 1.5,
  balance: 10_000,
  orders: [] as number[],
};
export type InitialValues = typeof initial_values;

const Index = () => {
  // const { data: meData } = useMeQuery();
  const searchParams = useSearchParams();
  const { refetchUser } = useFetchUser(false);
  const router = useRouter();

  const jwt = searchParams?.get("jwt");
  if (jwt && isBrowser()) {
    localStorage.setItem("token", jwt);
    // useMeQuery();
    router.push("/");
    refetchUser();
  }

  const handleSubmit = async (
    value: InitialValues,
    { setErrors, resetForm }: FormikHelpers<InitialValues>
  ) => {
    try {
      console.log(value);
      return;
    } catch (error) {}
  };

  const handleProfit = (values: InitialValues, setValues) => {
    values.orders.push(values.profit_v);
    setValues({
      ...values,
      balance: +values.balance + +values.profit_v,
    });
  };

  const handleLost = (values: InitialValues, setValues) => {
    values.orders.push(-values.lost_v);
    setValues({
      ...values,
      balance: +values.balance - +values.lost_v,
    });
  };

  const handleKeyDown = (e, values, setValues, type: "Profit" | "Lost") => {
    if (e.key != "Enter") {
      return;
    }
    const func = type === "Profit" ? handleProfit : handleLost;
    func(values, setValues);
  };

  return (
    <>
      <Navbar />
      <Container height="100vh">
        <DarkModeSwitch />

        <Hero title="Backtest" />
        <Container>
          <Formik initialValues={initial_values} onSubmit={handleSubmit}>
            {({ isSubmitting, errors, values, setValues }) => (
              <Form>
                <InputField
                  name="balance"
                  label="Balance"
                  type="number"
                  disabled={true}
                ></InputField>

                <Container>
                  <InputField
                    name="profit_v"
                    label="Profit"
                    type="number"
                    onKeyDown={(e) =>
                      handleKeyDown(e, values, setValues, "Profit")
                    }
                  ></InputField>
                  <Button
                    alignSelf={"self-start"}
                    onClick={() => handleProfit(values, setValues)}
                    color={"green"}
                  >
                    Add
                  </Button>
                </Container>

                <Container>
                  <InputField
                    name="lost_v"
                    label="Lost"
                    type="number"
                    onKeyDown={(e) =>
                      handleKeyDown(e, values, setValues, "Lost")
                    }
                  ></InputField>
                  <Button
                    alignSelf={"self-start"}
                    color={"red"}
                    onClick={() => handleLost(values, setValues)}
                  >
                    Add
                  </Button>
                </Container>

                <TestResult values={values} />
              </Form>
            )}
          </Formik>
        </Container>
      </Container>
    </>
  );
};
export default Index;

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
// const client = initializeApollo(
//   {
//     //truyen header tu client de nextjs gui kem toi server
//   },
//   context.req.headers
// );

// const { data } = await apolloClient.query({
//   query: PostsDocument,
//   variables: {
//     limit: 10,
//   },
// });

// return addApolloState(apolloClient, {});
//   return { props: {} };
// };

{
  /* <Hero />
    <Main>
      <Text color="text">
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
        <Code>TypeScript</Code>.
      </Text>

      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
    <CTA /> */
}
