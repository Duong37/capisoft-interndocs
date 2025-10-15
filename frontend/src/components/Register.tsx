import React, { useState } from 'react';
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
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react';

// Match backend UserTypes from users/models.py
const userTypes = createListCollection({
  items: [
    { label: "User", value: "USER" },  // From UserTypes.USER = "USER", "User"
    { label: "Admin", value: "ADMIN" }, // From UserTypes.ADMIN = "ADMIN", "Admin"
  ],
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    user_type: '',
    phone: '',
    birthday: ''
  });
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    const result = await register(
      formData.email,
      formData.password,
      formData.user_type as 'USER' | 'ADMIN',
    );
    if (!result.success) {
      alert(result.error);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" py={{ base: 12, md: 24 }}>
        <Stack gap={8} align="center">
          <Stack gap={2} textAlign="center">
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
              <Stack gap={4}>
                <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
                  <Field.Root required>
                    <Field.Label
                      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                      fontWeight={500}
                      color="gray.700"
                      mb={2}
                    >
                      First Name
                    </Field.Label>
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
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label
                      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                      fontWeight={500}
                      color="gray.700"
                      mb={2}
                    >
                      Last Name
                    </Field.Label>
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
                  </Field.Root>
                </Stack>
                <Field.Root required>
                  {/* @ts-ignore - Chakra UI v3 Field type definitions are incomplete */}
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
                </Field.Root>
                <Field.Root required>
                  {/* @ts-ignore - Chakra UI v3 Field type definitions are incomplete */}
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
                </Field.Root>
                <Field.Root required>
                  {/* @ts-ignore - Chakra UI v3 Field type definitions are incomplete */}
                  <Field.Label
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Confirm Password
                  </Field.Label>
                  <Input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
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
                </Field.Root>
                <Field.Root required>
                  <Select.Root
                    value={formData.user_type ? [formData.user_type] : []}
                    onValueChange={(details: any) => {
                      const [userType] = details.value; // Destructure single element
                      console.log('Selected user type:', userType);
                      setFormData({...formData, user_type: userType});
                    }}
                    collection={userTypes}
                  >
                    <Select.HiddenSelect name="user_type" />
                    <Select.Label
                      fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                      fontWeight={500}
                      color="gray.700"
                      mb={2}
                    >
                      User Type
                    </Select.Label>

                    <Select.Control>
                      <Select.Trigger
                        h="50px"
                        px={3}
                        borderRadius="8px"
                        borderWidth="1px"
                        borderColor="gray.200"
                        bg="white"
                        _focus={{ borderColor: '#6F6CF3', boxShadow: 'sm' }}
                        _hover={{ borderColor: 'gray.300' }}
                      >
                        <Select.ValueText
                          placeholder="Select account type"
                          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                          fontSize="14px"
                          color="gray.700"
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Portal>
                      <Select.Positioner>
                        <Select.Content
                          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                          fontSize="14px"
                          bg="white"
                          borderRadius="8px"
                          borderWidth="1px"
                          borderColor="gray.200"
                          boxShadow="lg"
                        >
                          {userTypes.items.map((userType: any) => (
                            <Select.Item item={userType} key={userType.value}>
                              {userType.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Phone (optional)
                  </Field.Label>
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
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={500}
                    color="gray.700"
                    mb={2}
                  >
                    Birthday (optional)
                  </Field.Label>
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