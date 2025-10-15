import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  Container,
  Link,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login button clicked, email:', email);
    
    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      
      if (!result.success) {
        console.error('Login failed:', result.error);
        alert(result.error);
      } else {
        console.log('Login successful');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md">
        <Stack align="center">
          <Stack gap={2} textAlign="center">
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
              <Stack gap={6}>
                <Field.Root required>
                  <Field.Label
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Email
                  </Field.Label>
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
                </Field.Root>
                <Field.Root required>
                  <Field.Label
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Password
                  </Field.Label>
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
                </Field.Root>
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
                <Text
                  textAlign="center"
                  color="gray.600"
                  fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                  fontSize="14px"
                >
                  Don't have an account yet?
                </Text>
                <Link
                  as={RouterLink}
                  to="/register"
                  color="#6F6CF3"
                  fontWeight={500}
                  fontSize="14px"
                  textDecoration="underline"
                  _hover={{ color: '#5c59e0' }}
                >
                  Register here
                </Link>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
