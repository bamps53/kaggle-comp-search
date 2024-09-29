import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, VStack, Heading, Text, Divider, Container, SimpleGrid, Link, Badge, Button, List, ListItem } from '@chakra-ui/react';
import useSearchStore from '../store/searchStore';
import { getCompetitionDetails, searchCompetitions, SearchResult, CompetitionDetails } from '../services/api';

const CompetitionDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { competitionDetails, setCompetitionDetails } = useSearchStore();
  const [similarCompetitions, setSimilarCompetitions] = useState<SearchResult[]>([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (slug) {
          const details = await getCompetitionDetails(slug);
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
  }, [slug, setCompetitionDetails]);

  const handleFindSimilar = async () => {
    if (competitionDetails) {
      setIsLoadingSimilar(true);
      try {
        const results = await searchCompetitions(competitionDetails.title);
        setSimilarCompetitions(results.filter(comp => comp.slug !== competitionDetails.slug).slice(0, 3));
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
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">Subtitle:</Text>
          <Text>{competitionDetails.subtitle}</Text>
          <Text fontSize="lg" fontWeight="bold">Deadline Date:</Text>
          <Text>{competitionDetails.deadlineDate}</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default CompetitionDetailsPage;