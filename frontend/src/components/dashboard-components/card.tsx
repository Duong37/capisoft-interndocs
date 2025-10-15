import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

const Card = ({ children, ...props }: CardProps) => (
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

