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
import adminImage from "../../images/Ellipse-819.svg";

const defaultAdmin = {
  name: "Carl Meadows",
  role: "Admin",
  noticesReviewed: 23353,
};

const NoticesReviewedPill = ({ value }) => (
  <Box bg="gray.100" borderRadius="xl" px={3} py={3} w="full" minW={0} maxW="100%" overflow="hidden">
    <StatRoot>
      <HStack justify="center" align="center" w="full" flexWrap="nowrap" spacing={1} minW={0}>
        <StatLabel 
          color="gray.500" 
          whiteSpace="nowrap" 
          fontWeight={500} 
          fontSize="12px" 
          mb="0"
          flexShrink={1}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          Notices Reviewed:
        </StatLabel>
        <StatValueText
          as="span"
          whiteSpace="nowrap"
          fontWeight={600}
          fontStyle="Semi Bold"
          fontSize="16px"
          lineHeight="160%"
          letterSpacing="0%"
          textAlign="right"
          flexShrink={0}
          minW={0}
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
      templateColumns={{ base: '1fr', sm: '1fr', md: 'minmax(70px, 90px) minmax(0, 1fr)' }}
      gap={{ base: 4, md: 5 }}
      alignItems="start"
      w="full"
      maxW="100%"
      overflow="visible"
    >
      {/* Left: avatar + name/role */}
      <GridItem minW="70px" maxW="100px" overflow="visible">
        <VStack spacing={0} align="center" w="full" mt={-2} maxW="100%">
          {/* Avatar image (SVG already circular with ring). Use plain img to avoid extra masking that crops it. */}
          <Box boxSize="84px" mb={0.5} flexShrink={0}>
            <img
              src={adminImage}
              alt="Admin avatar"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </Box>

          <VStack spacing={0} align="center" w="full" mt={-1} maxW="100%">
            <Text
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={500}
              fontStyle="medium"
              fontSize="12px"
              lineHeight="100%"
              textAlign="center"
              w="full"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {admin.name}
            </Text>
            <Text 
              color="gray.400" 
              textAlign="center" 
              fontSize="10px" 
              w="full" 
              lineHeight="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {admin.role}
            </Text>
          </VStack>
        </VStack>
      </GridItem>

      {/* Right: stat pill then button */}
      <GridItem alignSelf="start" minW={0} maxW="100%" overflow="visible">
        <VStack align="stretch" w="full" spacing={3} maxW="100%">
          <NoticesReviewedPill value={admin.noticesReviewed} />
          <Button
            w="full"
            h="46px"
            borderRadius="xl"
            colorScheme="purple"
            bg="#6F6CF3"
            _hover={{ bg: "#5c59e0" }}
            fontSize="16px"
            fontWeight="bold"
            maxW="100%"
            mt={1}
          >
            View Details
          </Button>
        </VStack>
      </GridItem>
  </Grid>
  {/* Extra bottom whitespace to balance the card visually */}
  <Box pb={4} />
  </>
);

export default TopAdminCard;
