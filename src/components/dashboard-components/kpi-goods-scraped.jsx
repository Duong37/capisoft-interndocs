import React from 'react';
import KpiCard from './kpi-card.jsx';

import { Text } from '@chakra-ui/react';

import coinImg from '../../images/coin.svg';

const KpiGoodsScraped = () => (
  <KpiCard
    title={
      <Text fontSize="md" display="flex" alignItems="center" pb="20px">
        <img
          src={coinImg}
          alt=""
          style={{ width: 20, height: 20, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}
        />
        % of Goods Scraped
      </Text>
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

