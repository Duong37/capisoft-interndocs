import React from 'react';
import { Box, Button, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { useMobileDetection } from '../../hooks/useMobileDetection';

const defaultNotifications = [
  {
    title: 'Mademoiselle 3.4fl.oz 100 ml perfume, CHANEL',
    url: 'https://yourproducturlgoeshere1122.com',
    time: '1 min ago',
  },
  {
    title: 'Cigarettes Crush balls Aroma, BLUE',
    url: 'https://yourproducturlgoeshere1122.com',
    time: '2 mins ago',
  },
  {
    title: 'Pokémon Enamel Pins Lot you can choose from',
    url: 'https://yourproducturlgoeshere1122.com',
    time: '2 mins ago',
  },
  {
    title: '4 PCS Herb Tobacco Spice Grinder, COMBAT',
    url: 'https://yourproducturlgoeshere1122.com',
    time: '2 mins ago',
  },
];

const NotificationsList = ({ items = defaultNotifications }) => {
  const isMobile = useMobileDetection();

  return (
    <>
      {/* Header - different layout for mobile vs desktop */}
      {isMobile ? (
        <HStack justify="space-between" align="center" gap={2}>
          <Text
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="medium"
            fontSize="18px"
            lineHeight="160%"
            letterSpacing="0"
            flex={1}
          >
            Notifications of Take Downs
          </Text>
          <Button size="sm" variant="ghost" flexShrink={0}>View all</Button>
        </HStack>
      ) : (
        <HStack justify="space-between" >
          <Text
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="medium"
            fontSize="18px"
            lineHeight="160%"
            letterSpacing="0"
          >
            Notifications of Take Downs
          </Text>
          <Button size="md" variant="ghost">View all</Button>
        </HStack>
      )}

      <Box pb={2} /> {/* Add padding between header and notifications */}

      <VStack align="stretch">
        {items.map((n, idx) => (
          <React.Fragment key={idx}>
            {idx !== 0 && (
              <Box borderTop="1px solid" borderColor="gray.100" />
            )}
            <Box py={2}>
              {isMobile ? (
                // Mobile layout: VStack with title, URL, time stacked
                <VStack align="stretch" gap={1}>
                  <Text
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    fontStyle="normal"
                    fontSize="14px"
                    lineHeight="160%"
                    letterSpacing="0"
                  >
                    {n.title}
                  </Text>
                  <Link
                    color="gray.500"
                    fontSize="12px"
                    wordBreak="break-all"
                    isTruncated
                  >
                    {n.url}
                  </Link>
                  <Text
                    color="gray.500"
                    fontSize="12px"
                    alignSelf="flex-start"
                  >
                    {n.time}
                  </Text>
                </VStack>
              ) : (
                // Desktop layout: original HStack
                <HStack justify="space-between" align="start">
                  <HStack align="center" gap={2}>
                    <Text
                      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                      fontWeight={400}
                      fontStyle="normal"
                      fontSize="14px"
                      lineHeight="160%"
                      letterSpacing="0"
                    >
                      {n.title}
                    </Text>
                    <Link color="gray.500" fontSize="sm">
                      {n.url}
                    </Link>
                  </HStack>
                  <Text color="gray.500" whiteSpace="nowrap">{n.time}</Text>
                </HStack>
              )}
            </Box>
          </React.Fragment>
        ))}
      </VStack>
    </>
  );
};

export default NotificationsList;
