import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  CardBody,
  CardRoot,
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
    <Container maxW="lg" py={{ base: 12, md: 24 }}>
      <Stack spacing={8} align="center">
        <Stack spacing={2} textAlign="center">
          <Heading size="lg">Welcome back</Heading>
          <Text color="gray.600">Sign in to access your dashboard</Text>
        </Stack>
        <CardRoot w="full" shadow="sm">
          <CardBody>
            <Box as="form" onSubmit={handleLogin}>
              <Stack spacing={5}>
                <FieldRoot required>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </FieldRoot>
                <FieldRoot required>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </FieldRoot>
                <Button type="submit" colorPalette="brand" size="md">
                  Log in
                </Button>
              </Stack>
            </Box>
          </CardBody>
        </CardRoot>
      </Stack>
    </Container>
  );
};

export default Login;
