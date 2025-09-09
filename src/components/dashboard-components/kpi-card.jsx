import React from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

const DeltaPill = ({ value }) => (
  <Box
    as="span"
    bg="green.50"
    color="green.600"
    borderRadius="full"
    px={2.5}
    py={1}
    fontSize="xs"
    fontWeight="semibold"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    w="60px"
    h="28px"
  >
    <span style={{ fontWeight: 'bold', marginRight: '4px' }}>&uarr;</span> {value}%
  </Box>
);

const KpiCard = ({
  title,
  value,
  delta,
  subtext,
  suffix = '',
  prefix = '',
  numberFormat = 'en-US',
  sparkline,
}) => {
  const fmt = new Intl.NumberFormat(numberFormat);
  const display = typeof value === 'number' ? fmt.format(value) : value;

  return (
    <HStack align="start" spacing={0} w="full">
      {/* Left side: title, value, delta, subtext */}
      <VStack align="start" spacing={1}>
        {/* Render string titles in Text; JSX titles as-is */}
        {typeof title === 'string' ? (
          <Text color="gray.600">{title}</Text>
        ) : (
          title
        )}

        <HStack
          align="center"
          spacing={3}
          mb={1}
          height="48px"
          gap="12px"
          position="relative"
        >
          <Text fontSize="4xl" fontWeight="semibold">
            {prefix}
            {display}
            {suffix}
          </Text>
          {typeof delta === 'number' ? <DeltaPill value={delta} /> : null}
        </HStack>

        {subtext ? <Text color="gray.500">{subtext}</Text> : null}
      </VStack>

      {/* Right side: sparkline */}
      {sparkline ? (
        <Box w="220px" h="84px" overflow="hidden" flexShrink={0}>
          {sparkline}
        </Box>
      ) : null}
    </HStack>
  );
};

export default KpiCard;
