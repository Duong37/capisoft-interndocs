import React, { useState } from "react";
import {
  Box,
  VStack,
  Link,
  Text,
  Button,
  Image,
  IconButton,
  DrawerRoot,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerBody
} from "@chakra-ui/react";
import { Link as RouterLink, useMatch, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSafeArea } from "../hooks/useSafeArea";
import { useHaptics } from "../hooks/useHaptics";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { ShakeToLogout } from "./plugin-components/ShakeToLogout";
import logoutPng from "../images/logout.png";
import homePng from "../images/home-2.svg";
import quoteDownSquarePng from "../images/quote-down-square.svg";
import userPng from "../images/user.svg";
import hamburgerPng from "../images/hamburger.png";
import todoPng from "../images/todo.png";

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

interface NavItemProps {
  to: string;
  icon?: string;
  children: React.ReactNode;
}

const NavItem = ({ to, icon, children }: NavItemProps) => {
  const match = useMatch({ path: to, end: false }); // safer than includes
  const active = Boolean(match);
  const { hapticsImpactLight } = useHaptics();

  const handleClick = () => {
    console.log(`Navigation: Clicked on ${children} (${to})`);
    hapticsImpactLight();
  };

  return (
    <RouterLink
      to={to}
      style={{ textDecoration: 'none' }}
    >
      <Link
        display="flex"
        alignItems="center"
        mx="auto"
        bg={active ? "#6F6CF3" : "transparent"}
        color={active ? "white" : "gray.800"}
        fontWeight={active ? "bold" : "normal"}
        {...pillProps}
        onClick={handleClick}
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
    </RouterLink>
  );
};

// Lightweight inline icons to avoid @chakra-ui/icons v2/v3 mismatch

interface HamburgerSvgProps {
  [key: string]: any;
}

const HamburgerSvg = (props: HamburgerSvgProps) => (
  <img src={hamburgerPng} alt="Menu" width={24} height={24} {...props} />
);

interface SidebarContentProps {
  onClose?: () => void;
  insideDrawer?: boolean;
}

const SidebarContent = ({ onClose, insideDrawer = false }: SidebarContentProps) => {
  const { logout } = useAuth();
  const { hapticsImpactMedium } = useHaptics();

  const handleLogout = () => {
    console.log('Navigation: Logout button clicked');
    hapticsImpactMedium();
    logout();
  };

  return (
    <Box
      w="220px"
      h="100vh"
      bg="white"
      opacity={1}
      position="relative"
      paddingTop={`var(--safe-area-inset-top, 0px)`}
      paddingLeft={`var(--safe-area-inset-left, 0px)`}
      paddingBottom={`var(--safe-area-inset-bottom, 0px)`}
    >
      {/* Close affordance: use DrawerCloseTrigger only when rendered inside Drawer */}
      {insideDrawer ? (
        <Box position="absolute" top={4} right={4}>
          <DrawerCloseTrigger />
        </Box>
      ) : null}
      
      <Box position="relative" h="830px">
        <VStack align="stretch" gap={3} px={4} pt="calc(16px + var(--safe-area-inset-top, 0px))" pb="80px">
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
            mt="8px"
            ml="10px"
            opacity={1}
            mb={2}
          >
            LOGO
          </Text>
          <NavItem to="/dashboard" icon={homePng}>Dashboard</NavItem>
          <NavItem to="/reviews" icon={quoteDownSquarePng}>Reviews</NavItem>
          <NavItem to="/users" icon={userPng}>Users</NavItem>
          <NavItem to="/todo" icon={todoPng}>Todo</NavItem>
        </VStack>

        <Button
          onClick={handleLogout}
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
  const isMobile = useMobileDetection();
  const { hapticsImpactLight } = useHaptics();

  // Initialize SafeArea for native devices
  useSafeArea();

  const handleHamburgerClick = () => {
    console.log('Navigation: Hamburger menu clicked');
    hapticsImpactLight();
    setIsSidebarOpen(true);
  };

  return (
    <Box minH="100vh" bg="gray.100">
      {/* Shake to logout functionality - only active when authenticated */}
      <ShakeToLogout />

      {/* Mobile hamburger menu */}
      {isMobile && (
        <Box position="fixed" top="calc(16px + var(--safe-area-inset-top, 0px))" left="calc(16px + var(--safe-area-inset-left, 0px))" zIndex={20}>
          <IconButton
            onClick={handleHamburgerClick}
            variant="solid"
            bg="white"
            color="gray.700"
            size="md"
            boxShadow="none"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.50", borderColor: "gray.300" }}
            _active={{ bg: "gray.100" }}
            p={2}
            // minW="40px"
            // h="40px"
            aria-label="Open sidebar"
          >
            <Box as={HamburgerSvg} boxSize={5} />
          </IconButton>
        </Box>
      )}
      
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="start" minH="100vh">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box position="fixed" top={0} left={0} zIndex={10}>
            <SidebarContent />
          </Box>
        )}
        
        {/* Mobile Drawer Sidebar */}
        {isSidebarOpen && isMobile && (
          <DrawerRoot
            open={true}
            onOpenChange={(e: any) => setIsSidebarOpen(e.open)}
            placement="start"
          >
            <DrawerBackdrop />
            <DrawerPositioner>
              <DrawerContent boxShadow="none" w="220px" maxW="220px" p={0}>
                <DrawerBody p={0}>
                  <SidebarContent onClose={() => setIsSidebarOpen(false)} insideDrawer />
                </DrawerBody>
              </DrawerContent>
            </DrawerPositioner>
          </DrawerRoot>
        )}
        
        {/* Main Content */}
        <Box
          flex="1"
          bg="gray.100"
          minH="100vh"
          w="full"
          maxW="100%"
          pl={isMobile ? "calc(8px + var(--safe-area-inset-left, 0px))" : "calc(24px + var(--safe-area-inset-left, 0px))"}
          pr={isMobile ? "calc(16px + var(--safe-area-inset-right, 0px))" : "calc(24px + var(--safe-area-inset-right, 0px))"}
          pt={isMobile ? "calc(64px + var(--safe-area-inset-top, 0px))" : "calc(16px + var(--safe-area-inset-top, 0px))"}
          pb="calc(16px + var(--safe-area-inset-bottom, 0px))"
          ml={isMobile ? 0 : "220px"}
          transition="margin-left 0.2s"
          overflow="hidden"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
