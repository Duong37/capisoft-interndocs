import React, { useState } from 'react';
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

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    birthday: ''
  });
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (!result.success) {
      alert(result.error);
    }
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
              Create account
            </Heading>
            <Text
              color="gray.600"
              fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontSize="18px"
            >
              Sign up to get started
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
            <Box as="form" onSubmit={handleRegister}>
              <Stack spacing={4}>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                  <FieldRoot required>
                    <FieldLabel
                      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                      fontWeight={500}
                      color="gray.700"
                      mb={2}
                    >
                      First Name
                    </FieldLabel>
                    <Input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="John"
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
                      Last Name
                    </FieldLabel>
                    <Input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Doe"
                      bg="white"
                      borderRadius="8px"
                      borderWidth="1px"
                      borderColor="gray.200"
                      h="50px"
                      _focus={{ boxShadow: 'sm', borderColor: '#6F6CF3' }}
                      _placeholder={{ color: 'gray.400' }}
                    />
                  </FieldRoot>
                </Stack>
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                <FieldRoot required>
                  <FieldLabel
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Confirm Password
                  </FieldLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                <FieldRoot>
                  <FieldLabel
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Phone (optional)
                  </FieldLabel>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    bg="white"
                    borderRadius="8px"
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="50px"
                    _focus={{ boxShadow: 'sm', borderColor: '#6F6CF3' }}
                    _placeholder={{ color: 'gray.400' }}
                  />
                </FieldRoot>
                <FieldRoot>
                  <FieldLabel
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Birthday (optional)
                  </FieldLabel>
                  <Input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
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
                  Create account
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;