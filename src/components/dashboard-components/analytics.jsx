import React from 'react';
import { Box, HStack, Text, useToken } from '@chakra-ui/react';
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
  const [removedFill, sentFill, rejectedFill, tickColor] = useToken('colors', [
    'blue.200',
    'green.200',
    'pink.200',
    'blackAlpha.600',
  ]);

  return (
    <>
      <HStack justify="space-between" align="center" mb={2}>
        <Text fontSize="lg" fontWeight="medium">
          Analytics
        </Text>

        <HStack spacing={6} color="gray.800">
          <LegendItem colorToken="blue.200" label="Listings Removed" />
          <LegendItem colorToken="green.200" label="Notices Sent" />
          <LegendItem colorToken="pink.200" label="Notices Rejected" />
        </HStack>
      </HStack>

      <Box w="100%" h="346px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            barGap={4}
            barCategoryGap={30}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis
              // leave width undefined or set to something wider (e.g. 56)
              allowDecimals={false}
              domain={[0, 6000]}
              ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000]}
              tickFormatter={(v) => numberFmt.format(v)}
              tickMargin={8}
              tick={{
                fill: tickColor,
                fontSize: 12,
                fontWeight: 400,
                textAnchor: 'end',
              }}
            />
            <Tooltip />
            <Bar
              dataKey="removed"
              name="Listings Removed"
              fill={removedFill}
              radius={[4, 4, 0, 0]}
              barSize={6}
            />
            <Bar
              dataKey="sent"
              name="Notices Sent"
              fill={sentFill}
              radius={[4, 4, 0, 0]}
              barSize={6}
            />
            <Bar
              dataKey="rejected"
              name="Notices Rejected"
              fill={rejectedFill}
              radius={[4, 4, 0, 0]}
              barSize={6}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default AnalyticsChart;
