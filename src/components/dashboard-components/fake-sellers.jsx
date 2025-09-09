import React from 'react';
import { Box, Button, HStack, Text, VStack, Image } from '@chakra-ui/react';

import greenUser from '../../images/green-user.svg';
import redUser from '../../images/red-user.svg';
import pinkUser from '../../images/pink-user.svg';
import blueUser from '../../images/blue-user.svg';
import yellowUser from '../../images/yellow-user.svg';

const defaultSellers = [
  { name: 'Rose Meadows', company: 'Company name', listing: '#2464', img: greenUser },
  { name: 'Madden Esparza', company: 'Company name', listing: '#6345', img: redUser },
  { name: 'Edison Norman', company: 'Company name', listing: '#9815', img: pinkUser },
  { name: 'Terrance Conner', company: 'Company name', listing: '#9245', img: blueUser },
  { name: 'Curtis Valentine', company: 'Company name', listing: '#2390', img: yellowUser },
];

const FakeSellers = ({ sellers = defaultSellers }) => (
  <>
    <HStack justify="space-between" mb={2}>
      <Text fontWeight="semibold" fontSize="lg" color="gray.700" letterSpacing="wide">
        Top 5 Fake Sellers
      </Text>
      <Button size="sm" variant="ghost" color="gray.600">
        View all
      </Button>
    </HStack>
    <VStack spacing={3} align="stretch">
      {sellers.map((s, i) => (
        <HStack key={i} justify="space-between" py={2}>
          <HStack>
            <Image src={s.img} alt="" boxSize="28px" />
            <Box>
              <Text fontWeight="medium" fontSize="md" color="gray.800">
                {s.name}
              </Text>
              <Text color="gray.500" fontSize="sm" fontStyle="italic">
                {s.company}
              </Text>
            </Box>
          </HStack>
          <Text color="gray.600" fontWeight="semibold" fontSize="sm" bg="gray.50" px={3} py={1} borderRadius="md">
            Listing {s.listing}
          </Text>
        </HStack>
      ))}
    </VStack>
  </>
);

export default FakeSellers;
