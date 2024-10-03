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

const Index = () => {
  const init = 10_000;
  const lost_v = 100;
  const lost_p = 1;
  const profit_v = 150;
  const profit_p = 1.5;
  const balance = 10_000;

  return (
    <Container height="100vh">
      <DarkModeSwitch />

      <Hero title="Backtest" />
      <Container>
        <Text color="text">hellaaaaaaaaaaaao</Text>
        <FormControl>
          <FormLabel htmlFor="init">Initial Balance</FormLabel>
          <Input id="init" placeholder="Initial Balance"></Input>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="profit">Profit</FormLabel>
          <Flex>
            <Input id="profit" placeholder="150"></Input>
            <Button>Add</Button>
          </Flex>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="lost">Profit</FormLabel>
          <Flex>
            <Input id="lost" placeholder="100"></Input>
            <Button>Add</Button>
          </Flex>
        </FormControl>
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
