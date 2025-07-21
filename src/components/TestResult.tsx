import { Container, Text, Box } from "@chakra-ui/react";
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
  ResponsiveContainer,
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
    <Container maxWidth="540px" width="100%" paddingY={2}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        width="100%"
      >
        <Box flex={1}>
          <Text mb={1}>Total order: {orders.length}</Text>
          <Text mb={1}>Wins: {numbWin(orders)}</Text>
          <Text mb={1}>Lost: {numbLost(orders)}</Text>
          <Text mb={1}>Win rate: {winRate(orders)}%</Text>
          <Text mb={1}>Largest Profit: {Math.max(0, ...orders)}$</Text>
          <Text mb={1}>Largest Lost: {Math.min(0, ...orders)}$</Text>
          <Text mb={1}>
            Profit: {gain_p}% ({gain_v}$)
          </Text>
        </Box>
        {/* Show note on the right */}
        {values.note && (
          <Box
            flex={1}
            ml={4}
            p={2}
            borderRadius="md"
            bg="#f7fafc"
            minHeight="120px"
            maxWidth="250px"
            wordBreak="break-word"
          >
            <Text fontWeight="bold" mb={1}>
              Note
            </Text>
            <Text whiteSpace="pre-line">{values.note}</Text>
          </Box>
        )}
      </Box>

      {values.orders.length > 0 && (
        <Box width="100%" maxW="500px" height="300px" mt={2} mb={0} p={0}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Container>
  );
};
