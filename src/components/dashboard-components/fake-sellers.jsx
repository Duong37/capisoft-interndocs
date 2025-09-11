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
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={500}
        fontStyle="normal"
        fontSize="18px"
        lineHeight="160%"
        letterSpacing="0"
        color="gray.700"
      >
        Top 5 Fake Sellers
      </Text>
      <Button size="m" variant="ghost">
        View all
      </Button>
    </HStack>
    <VStack align="stretch">
      {sellers.map((s, i) => (
        <HStack key={i} justify="space-between" py={1.5} pb={i === sellers.length - 1 ? 0 : 1.5}>
          <HStack>
            <Image src={s.img} alt="" />
            <Box>
              <Text fontWeight="medium" fontSize="12px" color="gray.800">
                {s.name}
              </Text>
              <Text color="gray.500" fontSize="10px">
                {s.company}
              </Text>
            </Box>
          </HStack>
          <Text
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="medium"
            fontSize="14px"
            lineHeight="160%"
            letterSpacing="0"
            textAlign="right"
            borderRadius="md"
            color="gray.500"
          >
            Listing{' '}
            {s.listing}
          </Text>
        </HStack>
      ))}
    </VStack>
  </>
);

export default FakeSellers;
