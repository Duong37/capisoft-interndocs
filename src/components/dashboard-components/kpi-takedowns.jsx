import React from 'react';
import KpiCard from './kpi-card.jsx';
import { Text, HStack, Image } from '@chakra-ui/react';
import chartSquare from '../../images/chart-square.svg';

const KpiTakedowns = () => (
  <KpiCard
    title={
      <HStack spacing={2} pb="20px">
        <Image 
          src={chartSquare} 
          alt="" 
          boxSize="20px"
          // filter="brightness(0) saturate(100%) invert(44%) sepia(7%) saturate(1190%) hue-rotate(180deg) brightness(99%) contrast(86%)"
        />
        <Text fontSize="md" color="gray.500">Number of Takedowns</Text>
      </HStack>
    }
    value={"593568"}
    numberFormat="en-US-u-nu-latn" // disables grouping (no comma)
    subtext={
      <Text fontSize="sm">
        October 2023
      </Text>
    }
    delta={20.5}
  />
);

export default KpiTakedowns;
