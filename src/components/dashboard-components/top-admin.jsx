import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  Avatar,
  StatRoot,
  StatLabel,
  StatValueText,
} from "@chakra-ui/react";

// Avatar image as URL (CRA and Vite default import returns a URL string)
import adminImageUrl from "../../images/Ellipse-819.svg";

const defaultAdmin = {
  name: "Carl Meadows",
  role: "Admin",
  noticesReviewed: 23353,
};

const NoticesReviewedPill = ({ value }) => (
  <Box bg="gray.100" borderRadius="xl" px={6} py={4} w="full">
    <StatRoot>
      <HStack justify="space-between" align="center" w="full" flexWrap="nowrap" gap={3}>
        <StatLabel color="gray.500" whiteSpace="nowrap" fontWeight={500}>
          Notices Reviewed:
        </StatLabel>
        <StatValueText as="span" whiteSpace="nowrap" fontSize="xl" fontWeight="bold">
          {Number(value).toLocaleString()}
        </StatValueText>
      </HStack>
    </StatRoot>
  </Box>
);

const TopAdminCard = ({ admin = defaultAdmin }) => (
  <>
    {/* Header */}
    <HStack as="header" justify="space-between" mb={3}>
      <Text fontWeight="semibold" fontSize="xl">
        Top Admin
      </Text>
      <Button size="m" variant="ghost">
        View all
      </Button>
    </HStack>

    <Grid
      templateColumns={{ base: '1fr', md: '90px 1fr' }}
      gap={{ base: 4, md: 5 }}
      alignItems="start"
      w="full"
    >
      {/* Left: avatar + name/role */}
      <GridItem minW="70px" maxW="100px">
        <VStack spacing={1} align="center" w="full">
          {/* Avatar with outer ring */}
          <Box p="1px" borderRadius="full" bg="whiteAlpha.900" display="inline-block">
            <Box borderRadius="full" bg="gray.300">
              <Avatar.Root boxSize="84px">
                <Avatar.Image src={adminImageUrl} alt={admin.name} />
                <Avatar.Fallback>
                  {admin.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </Avatar.Fallback>
              </Avatar.Root>
            </Box>
          </Box>

          <VStack spacing={0} align="center" w="full">
            <Text fontWeight="semibold" fontSize="xs" textAlign="center" w="full">
              {admin.name}
            </Text>
            <Text color="gray.500" textAlign="center" fontSize="xs" w="full">
              {admin.role}
            </Text>
          </VStack>
        </VStack>
      </GridItem>

      {/* Right: stat pill then button */}
      <GridItem alignSelf="start" minW={0}>
        <VStack align="stretch" w="full">
          <NoticesReviewedPill value={admin.noticesReviewed} mb={0} />
          <Button
            w="full"
            h="64px"
            borderRadius="2xl"
            colorScheme="purple"
            bg="#6F6CF3"
            _hover={{ bg: "#5c59e0" }}
            fontSize="xl"
            fontWeight="bold"
          >
            View Details
          </Button>
        </VStack>
      </GridItem>
    </Grid>
  </>
);

export default TopAdminCard;
