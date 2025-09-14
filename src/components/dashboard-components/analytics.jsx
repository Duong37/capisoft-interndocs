import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const defaultData = [
  { month: 'Jan', removed: 5800, sent: 4200, rejected: 600 },
  { month: 'Feb', removed: 5200, sent: 3900, rejected: 550 },
  { month: 'Mar', removed: 6000, sent: 4600, rejected: 650 },
  { month: 'Apr', removed: 5400, sent: 4100, rejected: 580 },
  { month: 'May', removed: 5900, sent: 4400, rejected: 620 },
  { month: 'Jun', removed: 5300, sent: 4700, rejected: 700 },
  { month: 'Jul', removed: 4500, sent: 4900, rejected: 730 },
  { month: 'Aug', removed: 5200, sent: 4650, rejected: 690 },
  { month: 'Sep', removed: 5800, sent: 4300, rejected: 610 },
  { month: 'Oct', removed: 5100, sent: 4550, rejected: 640 },
  { month: 'Nov', removed: 5700, sent: 4200, rejected: 590 },
  { month: 'Dec', removed: 6000, sent: 4500, rejected: 620 },
];

function LegendItem({ colorToken, label }) {
  return (
    <HStack spacing={2}>
      <Box w="10px" h="10px" borderRadius="full" bg={colorToken} />
      <Text fontSize="xs" fontWeight="semibold">
        {label}
      </Text>
    </HStack>
  );
}

const AnalyticsChart = ({ data = defaultData }) => {
  const numberFmt = new Intl.NumberFormat('en-US');

  // Resolve Chakra tokens to hex for Recharts
  // const [tickColor] = useToken('colors', [
  //   'blue.200',
  //   'green.200',
  //   '#FEA4A3',
  //   'blackAlpha.600',
  // ]);

  return (
    <>
      <HStack justify="space-between" align="center" mb={2}>
        <Text
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={500}
          fontStyle="normal"
          fontSize="18px"
          lineHeight="160%"
          letterSpacing="0"
        >
          Analytics
        </Text>

        <HStack gap={6} color="gray.800">
          <LegendItem colorToken="#D7F0FC" label="Listings Removed" />
          <LegendItem colorToken="#CDEFD9" label="Notices Sent" />
          <LegendItem colorToken="#FEA4A3" label="Notices Rejected" />
        </HStack>
      </HStack>

      <Box w="100%" h="266px" overflow="visible">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 10, left: 4, bottom: 0 }}
            barGap={4}
            barCategoryGap={26}
          >
            <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: '#E5E7EB' }}
              tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 400 }}
              tickLine={false}
              padding={{ left: -17, right: -19}}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, 6000]}
              ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000]}
              tickFormatter={(v) => numberFmt.format(v)}
              tickMargin={16}
              tick={{
                fill: "#6B7280",
                fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: 12,
                opacity: 0.8,
                lineHeight: "160%",
                letterSpacing: "0",
                textAnchor: "end",
                textAlign: "right",
              }}
              axisLine={false}
              tickLine={false}
              // width={80}
            />
            <Tooltip />
            <Bar
              dataKey="removed"
              name="Listings Removed"
              fill="#D7F0FC"
              barSize={6}
            />
            <Bar
              dataKey="sent"
              name="Notices Sent"
              fill="#CDEFD9"
              barSize={6}
            />
            <Bar
              dataKey="rejected"
              name="Notices Rejected"
              fill="#FEA4A3"
              barSize={6}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default AnalyticsChart;
