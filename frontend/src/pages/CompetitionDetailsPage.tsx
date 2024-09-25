import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, VStack, Heading, Text, Divider, Container, SimpleGrid, Link, Badge, Button, List, ListItem } from '@chakra-ui/react';
import useSearchStore from '../store/searchStore';
import { getCompetitionDetails, searchCompetitions, SearchResult } from '../services/api';

const CompetitionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { competitionDetails, setCompetitionDetails } = useSearchStore();
  const [similarCompetitions, setSimilarCompetitions] = useState<SearchResult[]>([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const details = await getCompetitionDetails(Number(id));
          setCompetitionDetails(details);
        }
      } catch (error) {
        console.error('Error fetching competition details:', error);
        // TODO: Handle error (e.g., show error message to user)
      }
    };

    fetchDetails();

    // Cleanup function
    return () => {
      setCompetitionDetails(null);
    };
  }, [id, setCompetitionDetails]);

  const handleFindSimilar = async () => {
    if (competitionDetails) {
      setIsLoadingSimilar(true);
      try {
        const results = await searchCompetitions(competitionDetails.title);
        setSimilarCompetitions(results.filter(comp => comp.id !== competitionDetails.id).slice(0, 3));
      } catch (error) {
        console.error('Error fetching similar competitions:', error);
        // TODO: Handle error
      } finally {
        setIsLoadingSimilar(false);
      }
    }
  };

  if (!competitionDetails) {
    return (
      <Container maxW="container.xl" centerContent>
        <Box py={10}>
          <Text fontSize="xl">Loading...</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch" py={8}>
        <Heading as="h1" size="xl">
          {competitionDetails.title}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Description</Text>
            <Text>{competitionDetails.description}</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Details</Text>
            <VStack align="stretch" spacing={2}>
              <Text><Badge colorScheme="blue">Dataset:</Badge> {competitionDetails.dataset}</Text>
              <Text><Badge colorScheme="green">Evaluation Metric:</Badge> {competitionDetails.evaluationMetric}</Text>
              <Text><Badge colorScheme="purple">Date:</Badge> {new Date(competitionDetails.date).toLocaleDateString()}</Text>
              <Text><Badge colorScheme="orange">Participants:</Badge> {competitionDetails.participants}</Text>
            </VStack>
          </Box>
        </SimpleGrid>
        <Divider />
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Top Solutions
          </Heading>
          <List spacing={2}>
            {competitionDetails.topSolutions.map((solution, index) => (
              <ListItem key={index}>
                <Link href={solution} isExternal color="blue.500">
                  Solution {index + 1}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Related Discussions
          </Heading>
          <List spacing={2}>
            {competitionDetails.relatedDiscussions.map((discussion, index) => (
              <ListItem key={index}>
                <Link href={discussion.url} isExternal color="blue.500">
                  {discussion.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Related Blog Posts
          </Heading>
          <List spacing={2}>
            {competitionDetails.relatedBlogPosts.map((post, index) => (
              <ListItem key={index}>
                <Link href={post.url} isExternal color="blue.500">
                  {post.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Similar Competitions
          </Heading>
          <Button onClick={handleFindSimilar} colorScheme="blue" isLoading={isLoadingSimilar} mb={4}>
            Find Similar Competitions
          </Button>
          {similarCompetitions.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {similarCompetitions.map((comp) => (
                <Box key={comp.id} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                  <RouterLink to={`/competition/${comp.id}`}>
                    <Text fontWeight="bold">{comp.title}</Text>
                    <Text fontSize="sm">Date: {new Date(comp.date).toLocaleDateString()}</Text>
                    <Text fontSize="sm">Participants: {comp.participants}</Text>
                  </RouterLink>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default CompetitionDetailsPage;