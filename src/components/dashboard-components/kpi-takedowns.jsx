import React from 'react';
import KpiCard from './kpi-card.jsx';

import { Text } from '@chakra-ui/react';

// Thin wrapper around the shared KPI card. Layout (Card container, grid)
// is handled by the Dashboard and Card components.
import chartSquare from '../../images/chart-square.svg';

const KpiTakedowns = () => (
  <KpiCard
    title={
      <Text fontSize="md" display="flex" alignItems="center" pb="20px">
        <img
          src={chartSquare}
          alt=""
          style={{ width: 20, height: 20, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }}
        />
        Number of Takedowns
      </Text>
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
