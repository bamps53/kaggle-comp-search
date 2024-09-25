import React from 'react';
import { Box, Text, Flex, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.100" py={4}>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems="center"
        maxW="container.xl" 
        mx="auto"
        px={4}
      >
        <Text fontSize="sm" mb={{ base: 2, md: 0 }}>
          © 2023 Kaggle Comp Search. All rights reserved.
        </Text>
        <Flex>
          <Link href="#" mr={4} fontSize="sm">
            Privacy Policy
          </Link>
          <Link href="#" fontSize="sm">
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;