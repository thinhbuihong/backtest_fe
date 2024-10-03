import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  FormLabel,
  Input,
  FormControl,
  Button,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Form, Formik, FormikHelpers } from "formik";
import InputField from "../components/InputField";

const Index = () => {
  const initial_values = {
    init: 10_000,
    lost_v: 100,
    lost_p: 1,
    profit_v: 150,
    profit_p: 1.5,
    balance: 10_000,
  };
  type InitialValues = typeof initial_values;

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
    console.log("profit", values);
    setValues({
      ...values,
      init: +values.init + +values.profit_v,
    });
  };

  const handleLost = (values: InitialValues, setValues) => {
    console.log("lost", values);
    setValues({
      ...values,
      init: +values.init - +values.lost_v,
    });
  };

  return (
    <Container height="100vh">
      <DarkModeSwitch />

      <Hero title="Backtest" />
      <Container>
        <Formik initialValues={initial_values} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, values, setValues }) => (
            <Form>
              <InputField
                name="init"
                label="Balance"
                placeholder="Balance"
              ></InputField>

              <Flex>
                <InputField name="profit_v" label="Profit"></InputField>
                <Button
                  alignSelf={"flex-end"}
                  onClick={() => handleProfit(values, setValues)}
                  color={"green"}
                >
                  Add
                </Button>
              </Flex>

              <Flex>
                <InputField name="lost_v" label="Lost"></InputField>
                <Button
                  color={"red"}
                  alignSelf={"flex-end"}
                  onClick={() => handleLost(values, setValues)}
                >
                  Add
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
};
export default Index;

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
