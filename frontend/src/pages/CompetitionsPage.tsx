import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Container, } from '@chakra-ui/react';
import { Competition, getCompetition } from '../services/api';

const CompetitionsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [competition, setCompetition] = useState<Competition>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const result = slug ? await getCompetition(slug) : await getCompetition("");
        setCompetition(result);
      } catch (error) {
        console.error("Error fetching competition:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [slug]);

  if (loading) {
    return (
      <Container maxW="container.xl" centerContent>
        <Box py={10}>
          <Text fontSize="xl">Loading...</Text>
        </Box>
      </Container>
    );
  }

  if (!competition) {
    return (
      <Container maxW="container.xl" centerContent>
        <Box py={10}>
          <Text fontSize="xl">Competition not found.</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch" py={8}>
        <Heading as="h1" size="xl">
          {competition.title}
        </Heading>
        <VStack align="start" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">Subtitle:</Text>
          <Text>{competition.subtitle}</Text>
          <Text fontSize="lg" fontWeight="bold">Deadline Date:</Text>
          <Text>{competition.deadlineDate}</Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default CompetitionsPage;