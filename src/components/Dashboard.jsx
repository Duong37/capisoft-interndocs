import React from 'react';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/users';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  StatRoot,
  StatLabel,
  StatValueText,
  Text,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const Dashboard = () => {
  const { logout } = useAuth();

  // Derive user stats dynamically from src/data/users
  const totalUsers = users.length;
  const statusCounts = users.reduce((acc, u) => {
    acc[u.status] = (acc[u.status] || 0) + 1;
    return acc;
  }, {});
  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([name, count]) => ({ name, count }));
  const roleData = Object.entries(roleCounts).map(([name, count]) => ({ name, count }));
  const onlineCount = statusCounts['Online'] || 0;
  const offlineCount = statusCounts['Offline'] || 0;

  return (
    <Container maxW="full" py={6} px={0}>
      <HStack justify="space-between" mb={6}>
        <Heading
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={600}
          fontStyle="normal"
          fontSize="32px"
          lineHeight="160%"
          letterSpacing="0"
        >
          Dashboard
        </Heading>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={6}>
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Box bg="white" borderWidth={0} border="none" boxShadow="none" borderRadius="24px" p={4}>
            <Text mb={4} fontWeight="semibold">Users by Role</Text>
            <Box w="100%" h={{ base: 200, md: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4a8af0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Box bg="white" borderWidth={0} border="none" boxShadow="none" borderRadius="24px" p={4}>
            <Text mb={4} fontWeight="semibold">Users by Status</Text>
            <Box w="100%" h={{ base: 200, md: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#63a4ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Box bg="white" borderWidth={0} border="none" boxShadow="none" borderRadius="24px" p={4}>
            <StatRoot>
              <StatLabel>Total Users</StatLabel>
              <StatValueText>{totalUsers}</StatValueText>
            </StatRoot>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Box bg="white" borderWidth={0} border="none" boxShadow="none" borderRadius="24px" p={4}>
            <StatRoot>
              <StatLabel>Online</StatLabel>
              <StatValueText>{onlineCount}</StatValueText>
            </StatRoot>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <Box bg="white" borderWidth={0} border="none" boxShadow="none" borderRadius="24px" p={4}>
            <StatRoot>
              <StatLabel>Offline</StatLabel>
              <StatValueText>{offlineCount}</StatValueText>
            </StatRoot>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Dashboard;
