import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  FieldLabel,
  FieldRoot,
  Heading,
  Input,
  Stack,
  Text,
  Container,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" py={{ base: 12, md: 24 }}>
        <Stack spacing={8} align="center">
          <Stack spacing={2} textAlign="center">
            <Heading 
              size="xl"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight={600}
              color="gray.800"
            >
              Welcome back
            </Heading>
            <Text 
              color="gray.600"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontSize="18px"
            >
              Sign in to access your dashboard
            </Text>
          </Stack>
          <Box
            w="full"
            bg="white"
            borderRadius="24px"
            p="32px"
            boxShadow="none"
            borderWidth="0"
          >
            <Box as="form" onSubmit={handleLogin}>
              <Stack spacing={6}>
                <FieldRoot required>
                  <FieldLabel 
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Email
                  </FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    bg="white"
                    borderRadius="8px"
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="50px"
                    _focus={{ boxShadow: 'sm', borderColor: '#6F6CF3' }}
                    _placeholder={{ color: 'gray.400' }}
                  />
                </FieldRoot>
                <FieldRoot required>
                  <FieldLabel 
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    bg="white"
                    borderRadius="8px"
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="50px"
                    _focus={{ boxShadow: 'sm', borderColor: '#6F6CF3' }}
                    _placeholder={{ color: 'gray.400' }}
                  />
                </FieldRoot>
                <Button 
                  type="submit" 
                  size="lg"
                  h="50px"
                  bg="#6F6CF3"
                  color="white"
                  borderRadius="10px"
                  _hover={{ bg: '#5c59e0' }}
                  _active={{ bg: '#4a47d1' }}
                  fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                  fontWeight={600}
                  fontSize="16px"
                >
                  Log in
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
