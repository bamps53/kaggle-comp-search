import React from 'react';
import { Box, Flex, Heading, Button, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box as="header" bg="blue.500" color="white" px={4} py={3}>
      <Flex alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Heading as="h1" size="lg">
          <Link to="/">Kaggle Comp Search</Link>
        </Heading>
        <Button as={Link} to="/search" colorScheme="whiteAlpha" size={buttonSize}>
          Search
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;