import React, { useState } from "react";
import { Box, VStack, Link, Text, HStack, Button, Image, IconButton, useBreakpointValue, Drawer } from "@chakra-ui/react";
import { Link as RouterLink, useMatch, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoutPng from "../images/logout.png";
import homePng from "../images/home-2.png";
import quoteDownSquarePng from "../images/quote-down-square.png";
import userPng from "../images/user.png";
import hamburgerPng from "../images/hamburger.png";

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
  transition: "background 120ms ease, color 120ms ease, font-weight 120ms ease",
  _focusVisible: { boxShadow: "none", outline: "none", fontWeight: "bold" },
  _hover: { bg: "#6F6CF3", color: "white", fontWeight: "bold" }
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
      fontWeight={active ? "bold" : pillProps.fontWeight || "normal"}
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

// Lightweight inline icons to avoid @chakra-ui/icons v2/v3 mismatch

const HamburgerSvg = (props) => (
  <img src={hamburgerPng} alt="Open menu" style={{ width: "1.5em", height: "1.5em" }} {...props} />
);
const CloseSvg = (props) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" />
  </svg>
);

const SidebarContent = ({ onClose }) => {
  const { logout } = useAuth();
  return (
    <Box w="220px" h="100vh" bg="white" opacity={1} position="relative">
      {/* Close button for mobile */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onClose}
        icon={<Box as={CloseSvg} boxSize={4} />}
        variant="ghost"
        position="absolute"
        top={4}
        right={4}
        size="sm"
      />
      
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
            ml="10px"
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
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  return (
    <Box minH="100vh" bg="gray.100">
      {/* Mobile hamburger menu */}
      {isMobile && (
        <Box position="fixed" top={4} left={4} zIndex={20}>
          <IconButton
            onClick={() => setIsSidebarOpen(true)}
            icon={<Box as={HamburgerSvg} boxSize={5} />}
            variant="solid"
            bg="white"
            color="gray.700"
            size="md"
            boxShadow="lg"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.50", borderColor: "gray.300" }}
            _active={{ bg: "gray.100" }}
            p={3}
          />
        </Box>
      )}
      
      <HStack align="start" spacing={0} minH="100vh">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box position="fixed" top={0} left={0} zIndex={10}>
            <SidebarContent />
          </Box>
        )}
        
        {/* Mobile Drawer Sidebar */}
        <Drawer.Root
          open={Boolean(isSidebarOpen && isMobile)}
          onOpenChange={(e) => setIsSidebarOpen(e.open)}
          placement="left"
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger />
              <SidebarContent onClose={() => setIsSidebarOpen(false)} />
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
        
        {/* Main Content */}
        <Box 
          flex="1" 
          bg="gray.100" 
          minH="100vh" 
          pl={{ base: 2, md: 6 }} 
          pr={{ base: 2, md: 6 }}
          pt={{ base: 16, md: 4 }}
          ml={{ base: 0, md: "220px" }}
          transition="margin-left 0.2s"
        >
          <Outlet />
        </Box>
      </HStack>
    </Box>
  );
};

export default Layout;
