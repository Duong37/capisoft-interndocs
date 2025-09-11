import React from 'react';
import KpiCard from './kpi-card.jsx';
import { Text, HStack, Image } from '@chakra-ui/react';
import coinImg from '../../images/coin.svg';

const KpiGoodsScraped = () => (
  <KpiCard
    title={
      <HStack spacing={2} pb="20px">
        <Image 
          src={coinImg} 
          alt="" 
          boxSize="20px"
          style={{ filter: "grayscale(100%) brightness(0.6)" }}
        />
        <Text fontSize="md" color="gray.500">% of Goods Scraped</Text>
      </HStack>
    }
    value={92.85}
    suffix="%"
    delta={20.5}
    subtext={
      <Text fontSize="sm">
        October 2023
      </Text>
    }
  />
);

export default KpiGoodsScraped;

