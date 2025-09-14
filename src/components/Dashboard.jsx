import React, { useState } from 'react';
import { Container, Grid, GridItem, Text, HStack, Box, VStack, Button } from '@chakra-ui/react';
import PageHeader from './PageHeader.jsx';
// charts and cards live in dashboard-components/*
import Card from './dashboard-components/card.jsx';
import KpiTakedowns from './dashboard-components/kpi-takedowns.jsx';
import KpiGoodsScraped from './dashboard-components/kpi-goods-scraped.jsx';
import KpiCardSparkline from './dashboard-components/kpi-card-sparkline.jsx';
import AnalyticsChart from './dashboard-components/analytics.jsx';
import FakeSellers from './dashboard-components/fake-sellers.jsx';
import NotificationsList from './dashboard-components/notifications.jsx';
import TopAdminCard from './dashboard-components/top-admin.jsx';

// KPI, lists, and chart datasets live in their components


const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  return (
    <Box>
      <Container maxW="full" py={{ base: 4, md: 6 }} px={0}>
        <PageHeader title="Dashboard" />

      {/* Sub header: date + platform chips (visual only) */}
      <VStack
        w="full"
        align="stretch"
        mb={{ base: 4, md: 6 }}
        spacing={{ base: 4, md: 0 }}
      >
        <HStack
          w="full"
          justify="space-between"
          align="center"
          spacing={{ base: 4, md: 0 }}
        >
          <Text
            color="black"
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="normal"
            fontSize="18px"
            lineHeight="160%"
            letterSpacing="0"
          >
            Wed, Oct 27
          </Text>

          <HStack spacing={3}>
            <Text
              color="gray.600"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={500}
              fontStyle="normal"
              fontSize="12px"
              lineHeight="160%"
              letterSpacing="0"
            >
              Choose Platform :
            </Text>
            <Button
            size="sm"
            height="36px"
            px="16px"
            bg={selectedPlatform === 'Alibaba' ? '#6F6CF3' : 'white'}
            color={selectedPlatform === 'Alibaba' ? 'white' : 'black'}
            borderRadius="12px"
            border="none"
            _hover={{ bg: '#6F6CF3', color: 'white' }}
            onClick={() => setSelectedPlatform('Alibaba')}
          >
            Alibaba
          </Button>
          <Button
            size="sm"
            height="36px"
            px="16px"
            bg={selectedPlatform === 'AliExpress' ? '#6F6CF3' : 'white'}
            color={selectedPlatform === 'AliExpress' ? 'white' : 'black'}
            borderRadius="12px"
            border="none"
            _hover={{ bg: '#6F6CF3', color: 'white' }}
            onClick={() => setSelectedPlatform('AliExpress')}
          >
            AliExpress
          </Button>
          <Button
            size="sm"
            height="36px"
            px="16px"
            bg={selectedPlatform === 'All' ? '#6F6CF3' : 'white'}
            color={selectedPlatform === 'All' ? 'white' : 'black'}
            borderRadius="12px"
            border="none"
            _hover={{ bg: '#6F6CF3', color: 'white' }}
            onClick={() => setSelectedPlatform('All')}
          >
            All
          </Button>
          </HStack>
        </HStack>
      </VStack>

      {/* KPI Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={{ base: 4, md: 6 }} mb={{ base: 4, md: 6 }}>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card>
            <KpiTakedowns />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card>
            <KpiGoodsScraped />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card>
            <KpiCardSparkline width={120} height={80} />
          </Card>
        </GridItem>
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={{ base: 4, md: 6 }}>
        {/* Analytics chart */}
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Card pl={2} overflow="visible">
            <AnalyticsChart />
          </Card>
        </GridItem>

        {/* Top 5 Fake Sellers */}
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card>
            <FakeSellers />
          </Card>
        </GridItem>

        {/* Notifications of Take Downs */}
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Card>
            <NotificationsList />
          </Card>
        </GridItem>

        {/* Top Admin */}
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Card overflow="visible">
            <TopAdminCard />
          </Card>
        </GridItem>
      </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
