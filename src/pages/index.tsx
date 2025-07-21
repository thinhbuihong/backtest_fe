import { Button, Box } from "@chakra-ui/react";

import { Form, Formik, FormikHelpers } from "formik";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSearchParams } from "next/navigation";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import DeleteOrderButton from "../components/DeleteOrderButton";
import DeleteHistoryButton from "../components/DeleteHistoryButton";

import { Hero } from "../components/Hero";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { TestResult } from "../components/TestResult";
import { useMeQuery } from "../gql-generated/__graphql__";
import { initializeApollo } from "../util/apollo-client";

import { isBrowser } from "../util/window";
import useFetchUser from "../hooks/useFetchMe";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";

const initial_values = {
  initial: 10_000,
  lost_v: 100,
  // lost_p: 1,
  profit_v: 150,
  // profit_p: 1.5,
  balance: 10_000,
  orders: [] as number[],
  note: "",
};
export type InitialValues = typeof initial_values;

const Index = () => {
  // const { data: meData } = useMeQuery();
  const searchParams = useSearchParams();
  const { refetchUser } = useFetchUser(false);
  const router = useRouter();
  const [showTestResult, setShowTestResult] = useState(false);

  // Toggle result/backtest with spacebar
  // Also: Q = profit, W = lost
  // Use refs to always get latest values/setValues from Formik
  const valuesRef = useRef<any>(null);
  const setValuesRef = useRef<any>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Prevent spacebar shortcut if focus is in the note input
      const active = document.activeElement;
      if (
        e.code === "Space" &&
        !e.repeat &&
        active &&
        (active as HTMLElement).getAttribute("name") === "note"
      ) {
        return;
      }
      if (e.code === "Space" && !e.repeat) {
        setShowTestResult((prev) => !prev);
      }
      if (
        (e.key === "q" || e.key === "Q") &&
        valuesRef.current &&
        setValuesRef.current
      ) {
        handleProfit(valuesRef.current, setValuesRef.current);
      }
      if (
        (e.key === "w" || e.key === "W") &&
        valuesRef.current &&
        setValuesRef.current
      ) {
        handleLost(valuesRef.current, setValuesRef.current);
      }
      // Ctrl+Z: remove last order
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "z" || e.key === "Z") &&
        valuesRef.current &&
        setValuesRef.current
      ) {
        const values = valuesRef.current;
        const setValues = setValuesRef.current;
        if (values.orders.length > 0) {
          const newOrders = [...values.orders];
          newOrders.pop();
          const newBalance =
            values.initial + newOrders.reduce((acc, v) => acc + v, 0);
          setValues({
            ...values,
            orders: newOrders,
            balance: newBalance,
          });
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
      <Container height="100vh">
        <DarkModeSwitch />

        <Hero title="Backtest" />
        <Formik initialValues={initial_values} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, values, setValues }) => {
            // Always keep latest values/setValues in refs for global keydown
            valuesRef.current = values;
            setValuesRef.current = setValues;
            return (
              <Container
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                {/* Nút chuyển đổi luôn nằm trên Hero */}
                <Box
                  width="100%"
                  maxWidth={["95vw", "700px"]}
                  mb={2}
                  display="flex"
                  justifyContent="center"
                >
                  {showTestResult ? (
                    <Button
                      colorScheme="blue"
                      width="200px"
                      onClick={() => setShowTestResult(false)}
                    >
                      Back to Backtest
                    </Button>
                  ) : (
                    <Button
                      colorScheme="blue"
                      width="200px"
                      onClick={() => setShowTestResult(true)}
                    >
                      Show Test Result
                    </Button>
                  )}
                </Box>

                {/* Danh sách profit/lost nhập vào */}
                <Box
                  width="100%"
                  maxWidth={["95vw", "700px"]}
                  mb={0.5}
                  display="flex"
                  flexWrap="nowrap"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="sm"
                  color="gray.700"
                  minHeight="32px"
                  overflowX={values.orders.length > 4 ? "auto" : "unset"}
                  sx={{
                    "::-webkit-scrollbar": { height: "6px" },
                    "::-webkit-scrollbar-thumb": {
                      background: "#CBD5E0",
                      borderRadius: "8px",
                    },
                  }}
                >
                  {values.orders.length === 0 ? (
                    <span>No profit/loss history</span>
                  ) : (
                    <>
                      {[...values.orders]
                        .slice(-4)
                        .reverse()
                        .map((v, i) => {
                          const orderIdx = values.orders.length - 1 - i;
                          return (
                            <Box
                              key={orderIdx}
                              px={2}
                              py={1}
                              m={1}
                              borderRadius="md"
                              bg={v >= 0 ? "green.100" : "red.100"}
                              color={v >= 0 ? "green.700" : "red.700"}
                              fontWeight="bold"
                              minW="48px"
                              textAlign="center"
                              flexShrink={0}
                              style={{ maxWidth: "80px", position: "relative" }}
                            >
                              <DeleteOrderButton
                                onDelete={() => {
                                  const newOrders = [...values.orders];
                                  newOrders.splice(orderIdx, 1);
                                  const newBalance =
                                    values.initial +
                                    newOrders.reduce((acc, v) => acc + v, 0);
                                  setValues({
                                    ...values,
                                    orders: newOrders,
                                    balance: newBalance,
                                  });
                                }}
                                label="Delete order"
                              />
                              {v >= 0 ? `+${v}` : v}
                            </Box>
                          );
                        })}
                      <DeleteHistoryButton
                        values={values}
                        setValues={setValues}
                      />
                    </>
                  )}
                </Box>
                {showTestResult ? (
                  <Container width="100%" maxWidth={["95vw", "700px"]} mt={8}>
                    <TestResult values={values} />
                  </Container>
                ) : (
                  <Container
                    id="backtest-form"
                    width="100%"
                    maxWidth={["95vw", "540px"]}
                  >
                    <Form>
                      <Box width="100%">
                        <InputField
                          name="balance"
                          label="Balance"
                          type="number"
                          disabled={true}
                        />
                      </Box>

                      <Container display="flex" alignItems="center" gap={2}>
                        <Box width="100%">
                          <InputField
                            name="profit_v"
                            label="Profit"
                            type="number"
                            onKeyDown={(e) =>
                              handleKeyDown(e, values, setValues, "Profit")
                            }
                          />
                        </Box>
                        <Button
                          alignSelf={"self-start"}
                          onClick={() => handleProfit(values, setValues)}
                          color={"green"}
                        >
                          Add
                        </Button>
                      </Container>

                      <Container display="flex" alignItems="center" gap={2}>
                        <Box width="100%">
                          <InputField
                            name="lost_v"
                            label="Lost"
                            type="number"
                            onKeyDown={(e) =>
                              handleKeyDown(e, values, setValues, "Lost")
                            }
                          />
                        </Box>
                        <Button
                          alignSelf={"self-start"}
                          color={"red"}
                          onClick={() => handleLost(values, setValues)}
                        >
                          Add
                        </Button>
                      </Container>
                      {/* Note input */}
                      <Box width="100%" mt={2}>
                        <InputField
                          name="note"
                          label="Note"
                          textarea
                          placeholder="Note..."
                        />
                      </Box>
                    </Form>
                  </Container>
                )}
              </Container>
            );
          }}
        </Formik>
      </Container>
      {/* Fixed Navbar at the bottom */}
      <Box
        position="fixed"
        left={0}
        right={0}
        bottom={0}
        zIndex={1000}
        width="100%"
      >
        <Navbar />
      </Box>
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
