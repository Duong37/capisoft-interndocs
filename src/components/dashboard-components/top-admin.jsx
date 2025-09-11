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
  <Box bg="gray.100" borderRadius="xl" px={4} py={3} w="full">
    <StatRoot>
      <HStack justify="flex-start" align="center" w="full" flexWrap="nowrap" gap={4}>
        <StatLabel color="gray.500" whiteSpace="nowrap" fontWeight={500} fontSize="12px" mb="0">
          Notices Reviewed:
        </StatLabel>
        <StatValueText
          as="span"
          whiteSpace="nowrap"
          // fontFamily="Inter"
          fontWeight={600}
          fontStyle="Semi Bold"
          fontSize="16px"
          lineHeight="160%"
          letterSpacing="0%"
          textAlign="right"
          ml={1}
        >
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
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={500}
        fontStyle="medium"
        fontSize="18px"
        lineHeight="160%"
        letterSpacing="0"
      >
        Top Admin
      </Text>
      <Button size="m" variant="ghost">
        View all
      </Button>
    </HStack>
    <Box pb={4} /> {/* Add padding between header and grid */}
    <Grid
      templateColumns={{ base: '1fr', md: '90px 1fr' }}
      gap={{ base: 4, md: 5 }}
      alignItems="start"
      w="full"
    >
      {/* Left: avatar + name/role */}
      <GridItem minW="70px" maxW="100px">
        <VStack spacing={0} align="center" w="full" mt={-2}>
          {/* Avatar with outer ring */}
          <Avatar.Root boxSize="84px" mb={0.5}>
            <Avatar.Image src={adminImageUrl}/>
          </Avatar.Root>

          <VStack spacing={0} align="center" w="full" mt={-1}>
            <Text
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={500}
              fontStyle="medium"
              fontSize="12px"
              lineHeight="100%"
              textAlign="center"
              w="full"
            >
              {admin.name}
            </Text>
            <Text color="gray.400" textAlign="center" fontSize="10px" w="full" lineHeight="100%">
              {admin.role}
            </Text>
          </VStack>
        </VStack>
      </GridItem>

      {/* Right: stat pill then button */}
      <GridItem alignSelf="start" minW={0}>
        <VStack align="stretch" w="full" spacing={3}>
          <NoticesReviewedPill value={admin.noticesReviewed} />
          <Box pt={1}>
            <Button
            w="full"
            h="46px"
            borderRadius="xl"
            colorScheme="purple"
            bg="#6F6CF3"
            _hover={{ bg: "#5c59e0" }}
            fontSize="16px"
            fontWeight="bold"
          >
            View Details
          </Button>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  </>
);

export default TopAdminCard;
