import { Container, Text } from "@chakra-ui/react";
import Index, { InitialValues } from "../pages";
import {
  numbLost,
  numbWin,
  profitCalculator,
  winRate,
} from "../util/caculator";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useWindowDimensions from "../hooks/useDimentions";

export const TestResult = ({ values }: { values: InitialValues }) => {
  const { orders, initial } = values;
  const [gain_p, gain_v] = profitCalculator(initial, orders);
  const { height, width } = useWindowDimensions();

  const balance = [{ value: 0, index: 0 }];
  orders.forEach((value, index) => {
    balance.push({
      value: balance[index].value + value,
      index: index + 1,
    });
  });

  return (
    <Container marginTop={"2rem"}>
      <Text>Total order: {orders.length}</Text>
      <Text>Wins: {numbWin(orders)}</Text>
      <Text>Lost: {numbLost(orders)}</Text>
      <Text>Win rate: {winRate(orders)}%</Text>
      <Text>Largest Profit: {Math.max(0, ...orders)}$</Text>
      <Text>Largest Lost: {Math.min(0, ...orders)}$</Text>
      <Text>
        Profit: {gain_p}% ({gain_v}$)
      </Text>

      {values.orders.length && (
        <LineChart width={500} height={500} data={balance}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="index" /> */}
          {/* <YAxis /> */}
          {/* <Legend /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </Container>
  );
};
