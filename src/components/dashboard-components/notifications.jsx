import React from 'react';
import { Box, Button, HStack, Link, Text, VStack } from '@chakra-ui/react';

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

const NotificationsList = ({ items = defaultNotifications }) => (
  <>
    <HStack justify="space-between" mb={2}>
      <Text fontWeight="semibold">Notifications of Take Downs</Text>
      <Button size="m" variant="ghost" color="gray.600">View all</Button>
    </HStack>
    <VStack align="stretch" spacing={0}>
      {items.map((n, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && (
            <Box borderTop="1px solid" borderColor="gray.200" />
          )}
          <Box py={3}>
            <HStack justify="space-between" align="start">
              <HStack align="center" spacing={2}>
                <Text>{n.title}</Text>
                <Link href={n.url} color="gray.500" fontSize="sm" isExternal>
                  {n.url}
                </Link>
              </HStack>
              <Text color="gray.500" whiteSpace="nowrap">{n.time}</Text>
            </HStack>
          </Box>
        </React.Fragment>
      ))}
    </VStack>
  </>
);

export default NotificationsList;
