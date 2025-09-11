import React, { useState } from 'react';
import { Container, Grid, GridItem, Heading, Text, HStack, Box, Input, VStack, Button } from '@chakra-ui/react';
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

import searchNormalImage from '../images/search-normal.svg';
import adminLogoTopRight from '../images/Ellipse-816.svg'

const Dashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  return (
    <Box>
      <Container maxW="full" py={{ base: 4, md: 6 }} px={0}>
      {/* Top bar: heading, search field, admin profile (mock) */}
      <VStack w="full" mb={{ base: 6, md: 12 }} align="stretch" spacing={{ base: 0, md: 0 }}>
        <HStack w="full" align="center" justify={{ base: "center", md: "space-between" }} mb={{ base: 4, md: 0 }}>
          <Heading
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={600}
            fontStyle="normal"
            fontSize={{ base: "24px", md: "32px" }}
            lineHeight="160%"
            letterSpacing="0"
            textAlign={{ base: "center", md: "left" }}
          >
            Dashboard
          </Heading>
          <HStack spacing={{ base: 4, md: 10 }} align="center" display={{ base: "none", md: "flex" }}>
            <Box
              position="relative"
              width="491px"
              height="50px"
              borderRadius="8px"
              opacity={1}
              flex="none"
            >
            <Input
              placeholder="  Search"
              fontSize="16px"
              bg="white"
              borderRadius="8px"
              borderWidth="0"
              pr="44px"
              h="50px"
              // _focus={{ boxShadow: 'sm'}}
              width="491px"
              height="50px"
            />
            {/* right icon without InputRightElement to avoid v3 issues */}
            <Box
              position="absolute"
              right="14px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              color="gray.400"
            >
              <img
                src={searchNormalImage}
                alt="Search"
                style={{
                  width: 18,
                  height: 18,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)'
                }}
              />
              
            </Box>
          </Box>
          <HStack spacing={3} ml="40px">
            <Box w="40px" h="40px" borderRadius="full" bg="gray.300" overflow="hidden">
              <img
                src={adminLogoTopRight}
                alt="Admin Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Box>
            <VStack spacing="0px" align="start">
              <Text fontWeight={600} lineHeight="1">John Smith</Text>
              <Text color="gray.500" fontSize="sm" lineHeight="1">Admin</Text>
            </VStack>
          </HStack>
          </HStack>
        </HStack>
        
        {/* Mobile admin profile - positioned in top right */}
        <Box position="fixed" top={4} right={4} zIndex={15} display={{ base: "block", md: "none" }}>
          <HStack spacing={2}>
            <VStack align="end" spacing="0px">
              <Text fontWeight={600} fontSize="sm" lineHeight="1" color="gray.800">John Smith</Text>
              <Text color="gray.500" fontSize="xs" lineHeight="1">Admin</Text>
            </VStack>
            <Box w="32px" h="32px" borderRadius="full" bg="gray.300" overflow="hidden">
              <img
                src={adminLogoTopRight}
                alt="Admin Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Box>
          </HStack>
        </Box>
        
        {/* Mobile search */}
        <VStack w="full" spacing={4} display={{ base: "flex", md: "none" }}>
          <Box
            position="relative"
            width="100%"
            maxW="400px"
            height="50px"
            borderRadius="8px"
            opacity={1}
          >
            <Input
              placeholder="  Search"
              fontSize="16px"
              bg="white"
              borderRadius="8px"
              borderWidth="0"
              pr="44px"
              h="50px"
              w="100%"
            />
            <Box
              position="absolute"
              right="14px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              color="gray.400"
            >
              <img
                src={searchNormalImage}
                alt="Search"
                style={{
                  width: 18,
                  height: 18,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)'
                }}
              />
            </Box>
          </Box>
        </VStack>
      </VStack>

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
