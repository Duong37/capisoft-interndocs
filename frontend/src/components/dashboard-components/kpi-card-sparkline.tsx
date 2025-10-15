import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';
import KpiCard from './kpi-card';
import graphImg from '../../images/Graph.svg';
import messageNotifImg from '../../images/message-notif.svg';

interface KpiCardSparklineProps {
  width?: number;
  height?: number;
}

const KpiCardSparkline = ({ width, height }: KpiCardSparklineProps) => (
  <KpiCard
    title={
      <HStack gap={2} pb="20px" flexShrink={0} whiteSpace="nowrap">
        <Image
          src={messageNotifImg}
          alt="New Notices"
          boxSize={6}
          // filter="grayscale"
          opacity={0.8}
          flexShrink={0}
        />
        <Text fontSize="md" color="gray.500" whiteSpace="nowrap">New Notices</Text>
      </HStack>
    }
    value={"2935"}
    delta={0}
    subtext={<Text fontSize="sm" color="gray.500">October 2023</Text>}
    sparkline={
      <Image
        src={graphImg}
        alt="Sparkline"
        width="155px"
        height="88px"
        objectFit="contain"
      />
    }
  />
);

export default KpiCardSparkline;
