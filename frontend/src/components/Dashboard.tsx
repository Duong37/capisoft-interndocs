import React, { useState } from 'react';
import { Container, Grid, GridItem, Text, HStack, Box, VStack, Button } from '@chakra-ui/react';
import PageHeader from './PageHeader';
import { useMobileDetection } from '../hooks/useMobileDetection';
// charts and cards live in dashboard-components/*
import Card from './dashboard-components/card';
import KpiTakedowns from './dashboard-components/kpi-takedowns';
import KpiGoodsScraped from './dashboard-components/kpi-goods-scraped';
import KpiCardSparkline from './dashboard-components/kpi-card-sparkline';
import AnalyticsChart from './dashboard-components/analytics';
import FakeSellers from './dashboard-components/fake-sellers';
import NotificationsList from './dashboard-components/notifications';
import TopAdminCard from './dashboard-components/top-admin';

// KPI, lists, and chart datasets live in their components


const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const isMobile = useMobileDetection();

  return (
    <Box>
      <Container maxW="full" py={{ base: 4, md: 6 }} px={0}>
        <PageHeader title="Dashboard" />

      {/* Sub header: date + platform chips (visual only) */}
      <VStack
        w="full"
        align="stretch"
        mb={{ base: 4, md: 6 }}
        gap={{ base: 4, md: 0 }}
      >
        {/* Platform selector - different layout for mobile vs desktop */}
        {isMobile ? (
          // Mobile layout: date on left, VStack with platform selector on right
          <HStack
            w="full"
            justify="space-between"
            align="flex-start"
            gap={4}
          >
            <Text
              color="black"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={500}
              fontStyle="normal"
              fontSize="18px"
              lineHeight="160%"
              letterSpacing="0"
              flexShrink={0}
            >
              Wed, Oct 27
            </Text>

            <VStack alignItems="flex-end" gap={3} flex={1}>
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
              <HStack gap={3}>
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
            </VStack>
          </HStack>
        ) : (
          // Desktop layout: date on left, platform selector on right (unchanged)
          <HStack
            w="full"
            justify="space-between"
            align="center"
            gap={0}
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
            <HStack gap={3}>
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
        )}
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
