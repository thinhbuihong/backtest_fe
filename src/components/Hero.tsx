import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({
  title = "with-chakra-ui-typescript",
}: {
  title: string;
}) => (
  <Flex
    justifyContent="center"
    alignItems="top"
    // height="100vh"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);

// Hero.defaultProps = {
//   title: "with-chakra-ui-typescript",
// };
