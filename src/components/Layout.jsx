import React from "react";
import { Box, VStack, Link, Text, HStack, Button, Image } from "@chakra-ui/react";
import { Link as RouterLink, useMatch, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoutPng from "../images/logout.png";
import homePng from "../images/home-2.png";
import quoteDownSquarePng from "../images/quote-down-square.png";
import userPng from "../images/user.png";

const pillProps = {
  w: "180px",
  h: "48px",
  px: 3,
  gap: "12px",
  borderRadius: "12px",
  borderWidth: 0,
  borderColor: "transparent",
  boxShadow: "none",
  outline: "none",
  transition: "background 120ms ease, color 120ms ease",
  _focusVisible: { boxShadow: "none", outline: "none" },
  _hover: { bg: "#6F6CF3", color: "white" },
};

const NavItem = ({ to, icon, children }) => {
  const match = useMatch({ path: to, end: false }); // safer than includes
  const active = Boolean(match);
  return (
    <Link
      as={RouterLink}
      to={to}
      display="flex"
      alignItems="center"
      mx="auto"
      bg={active ? "#6F6CF3" : "transparent"}
      color={active ? "white" : "gray.800"}
      {...pillProps}
      css={{
        '&:focus-visible': { boxShadow: 'none', outline: 'none' },
        '&:hover .nav-icon': { filter: 'brightness(0) invert(1)' },
      }}
    >
      {icon ? (
        <Image
          src={icon}
          alt=""
          boxSize="20px"
          className="nav-icon"
          filter={active ? 'brightness(0) invert(1)' : 'none'}
        />
      ) : null}
      <Text as="span">{children}</Text>
    </Link>
  );
};

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <Box w="220px" h="1024px" bg="white" opacity={1} borderRightWidth="1px" position="sticky" top={0}>
      <Box position="relative" h="830px">
        <VStack align="stretch" spacing={3} px={4} pt={4} pb="80px">
          <Text
            fontFamily="Urbanist, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={900}
            fontStyle="normal"
            fontSize="32px"
            lineHeight="160%"
            letterSpacing="0"
            whiteSpace="nowrap"
            w="auto"
            maxW="172px"
            mt="24px"
            ml="24px"
            opacity={1}
            mb={2}
          >
            LOGO
          </Text>
          <NavItem to="/dashboard" icon={homePng}>Dashboard</NavItem>
          <NavItem to="/reviews" icon={quoteDownSquarePng}>Reviews</NavItem>
          <NavItem to="/users" icon={userPng}>Users</NavItem>
        </VStack>

        <Button
          onClick={logout}
          position="absolute"
          left="20px"
          bottom="32px"
          variant="ghost"
          color="gray.800"
          justifyContent="flex-start"
          {...pillProps}
          css={{
            ...(pillProps._focusVisible ? { '&:focus-visible': pillProps._focusVisible } : {}),
            '&:hover .nav-icon': { filter: 'brightness(0) invert(1)' },
          }}
        >
          <Image src={logoutPng} alt="" boxSize="20px" className="nav-icon" />
          <Text>Log out</Text>
        </Button>
      </Box>
    </Box>
  );
};

// Layout wraps all authenticated pages and renders their content via <Outlet />.
const Layout = () => (
  <HStack align="start" spacing={0} minH="100vh">
    <Sidebar />
    <Box flex="1" bg="gray.50" minH="100vh" px={4} pt={4}>
      <Outlet />
    </Box>
  </HStack>
);

export default Layout;
