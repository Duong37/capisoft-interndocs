import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  StatRoot,
  StatLabel,
  StatValueText,
} from "@chakra-ui/react";
import { useMobileDetection } from "../../hooks/useMobileDetection";

// Avatar image as URL (CRA and Vite default import returns a URL string)
import adminImage from "../../images/Ellipse-819.svg";

const defaultAdmin = {
  name: "Carl Meadows",
  role: "Admin",
  noticesReviewed: 23353,
};

interface NoticesReviewedPillProps {
  value: number;
}

const NoticesReviewedPill = ({ value }: NoticesReviewedPillProps) => (
  <Box bg="gray.100" borderRadius="xl" px={3} py={3} w="full" minW={0} maxW="100%" overflow="hidden">
    <StatRoot>
      <HStack justify="center" align="center" w="full" flexWrap="nowrap" gap={1} minW={0}>
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

interface Admin {
  name: string;
  role: string;
  noticesReviewed: number;
}

interface TopAdminCardProps {
  admin?: Admin;
}

const TopAdminCard = ({ admin = defaultAdmin }: TopAdminCardProps) => {
  const isMobile = useMobileDetection();

  return (
    <>
      {/* Header - different layout for mobile vs desktop */}
      {isMobile ? (
        <HStack justify="space-between" align="center" gap={2}>
          <Text
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="medium"
            fontSize="16px"
            lineHeight="160%"
            letterSpacing="0"
            flex={1}
          >
            Top Admin
          </Text>
          <Button size="sm" variant="ghost" flexShrink={0}>
            View all
          </Button>
        </HStack>
      ) : (
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
          <Button size="md" variant="ghost">
            View all
          </Button>
        </HStack>
      )}

      <Box pb={isMobile ? 3 : 1} /> {/* Add padding between header and grid */}

      {isMobile ? (
        // Mobile layout: centered VStack
        <VStack align="center" gap={4} w="full">
          {/* Centered admin image */}
          <Box boxSize="84px" flexShrink={0}>
            <img
              src={adminImage}
              alt="Admin avatar"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </Box>

          {/* Admin info */}
          <VStack gap={1} align="center" w="full" maxW="100%">
            <Text
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={500}
              fontStyle="medium"
              fontSize="14px"
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
              fontSize="12px"
              w="full"
              lineHeight="100%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {admin.role}
            </Text>
          </VStack>

          {/* Stat pill */}
          <Box bg="gray.100" borderRadius="xl" px={3} py={3} w="full" minW={0} maxW="100%" overflow="hidden">
            <StatRoot>
              <HStack justify="center" align="center" w="full" flexWrap="nowrap" gap={1} minW={0}>
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
                  {Number(admin.noticesReviewed).toLocaleString()}
                </StatValueText>
              </HStack>
            </StatRoot>
          </Box>

          {/* View Details button */}
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
          >
            View Details
          </Button>
        </VStack>
      ) : (
        // Desktop layout: original Grid
        <Grid
          templateColumns="minmax(70px, 90px) minmax(0, 1fr)"
          gap={5}
          alignItems="start"
          w="full"
          maxW="100%"
          overflow="visible"
        >
          {/* Left: avatar + name/role */}
          <GridItem minW="70px" maxW="100px" overflow="visible">
            <VStack mt={-2} align="center" w="full" maxW="100%">
              {/* Avatar image (SVG already circular with ring). Use plain img to avoid extra masking that crops it. */}
              <Box boxSize="84px" mb={0.5} flexShrink={0}>
                <img
                  src={adminImage}
                  alt="Admin avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </Box>

              <VStack gap={2} align="center" w="full" maxW="100%">
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
            <VStack align="stretch" w="full" gap={3} maxW="100%">
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
      )}
      {/* Extra bottom whitespace to balance the card visually */}
      <Box pb={4} />
    </>
  );
};

export default TopAdminCard;
