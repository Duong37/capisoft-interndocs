import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ children, ...props }) => (
  <Box
    bg="white"
    borderWidth={0}
    border="none"
    boxShadow="none"
    borderRadius="24px"
    p={{ base: 4, md: 6 }}
    overflow="hidden"
    {...props}
  >
    {children}
  </Box>
);

export default Card;

