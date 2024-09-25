import React from 'react';
import { Box, Heading, Text, Button, VStack, Container, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Container maxW="container.xl" centerContent>
      <VStack spacing={8} align="center" py={16}>
        <Heading as="h1" size={headingSize} textAlign="center">
          Welcome to Kaggle Comp Search
        </Heading>
        <Text fontSize={textSize} textAlign="center" maxW="2xl">
          Find and compare past Kaggle competitions efficiently. Discover competitions that match your interests and skill level, or explore similar challenges to enhance your data science journey.
        </Text>
        <Button as={Link} to="/search" size="lg" colorScheme="blue">
          Start Searching
        </Button>
        <Box mt={8}>
          <Text fontSize="md" textAlign="center">
            Perfect for Kaggle beginners, experienced data scientists, and machine learning engineers looking for their next challenge.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;