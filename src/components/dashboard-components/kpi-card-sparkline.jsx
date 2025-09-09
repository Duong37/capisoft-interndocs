import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';
import KpiCard from './kpi-card.jsx';
import graphImg from '../../images/Graph.svg';
import messageNotifImg from '../../images/message-notif.svg';

const KpiCardSparkline = () => (
  <KpiCard
    title={
      <HStack spacing={2} pb="20px">
        <Image 
          src={messageNotifImg} 
          alt="" 
          boxSize="24px"
          filter="brightness(0) saturate(100%) invert(44%) sepia(7%) saturate(1190%) hue-rotate(180deg) brightness(99%) contrast(86%)"
        />
        <Text fontSize="md" color="gray.500">New Notices</Text>
      </HStack>
    }
    value={"2935"}
    subtext={<Text fontSize="sm" color="gray.500">October 2023</Text>}
    sparkline={<Image src={graphImg} alt="Sparkline" w="full" h="full" objectFit="contain" objectPosition="bottom right" />}
    sparklineWidth={220}
    sparklineHeight={84}
    sparklineBottomOffset={0}
    sparklineTopOffset={0}
    minHeight={180}
  />
);

export default KpiCardSparkline;
