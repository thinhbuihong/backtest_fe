import { Container, Text } from "@chakra-ui/react";
import { InitialValues } from "../pages";
import {
  numbLost,
  numbWin,
  profitCalculator,
  winRate,
} from "../util/caculator";

export const TestResult = ({ values }: { values: InitialValues }) => {
  const { orders, initial } = values;
  const [gain_p, gain_v] = profitCalculator(initial, orders);

  return (
    <Container marginTop={"2rem"}>
      <Text>Total order: {orders.length}</Text>
      <Text>Wins: {numbWin(orders)}</Text>
      <Text>Lost: {numbLost(orders)}</Text>
      <Text>Win rate: {winRate(orders)}</Text>
      <Text>
        Profit: {gain_p}% ({gain_v}$)
      </Text>
    </Container>
  );
};
