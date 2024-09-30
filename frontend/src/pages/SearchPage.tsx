import React, { useEffect, useState, useDeferredValue } from 'react';
import { Box, VStack, Input, Text, SimpleGrid, Select, Container, Heading, useBreakpointValue, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useSearchStore from '../store/searchStore';
import { searchCompetitions, Competition } from '../services/api';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'name'>('relevance');
  const { competitions, setCompetitions } = useSearchStore();

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  useEffect(() => {
    const initializeSearchResults = async () => {
      try {
        const results = await searchCompetitions("");
        setCompetitions(results);
      } catch (error) {
        console.error("Error initializing search results:", error);
      }
    };

    initializeSearchResults();
  }, [setCompetitions]);

  useEffect(() => {
    const handleSearch = async () => {
      setError(null);
      try {
        const competitions = await searchCompetitions(deferredSearchTerm);
        setCompetitions(competitions);
      } catch (err) {
        setError('An error occurred while searching. Please try again.');
        console.error(err);
      }
    };

    handleSearch();
  }, [deferredSearchTerm, setCompetitions]);

  const sortCompetitions = (competitions: Competition[]) => {
    switch (sortBy) {
      case 'date':
        return [...competitions].sort((a, b) => new Date(b.deadlineDate).getTime() - new Date(a.deadlineDate).getTime());
      case 'name':
        return [...competitions].sort((a, b) => a.slug.localeCompare(b.slug));
      default:
        return competitions; // 'relevance' is the default order from the API
    }
  };

  const sortedCompetitions = sortCompetitions(competitions);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxW="100%" centerContent>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch" w="100%">
          <Heading as="h1" size="xl" textAlign="center">
            Search Kaggle Competitions
          </Heading>
          <Input
            id="search-input"
            placeholder="Enter competition name or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            w="100%"
          />
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date' | 'name')} size="md" w="100%">
            <option value="relevance">Sort by Relevance</option>
            <option value="date">Sort by Date</option>
            <option value="participants">Sort by Participants</option>
          </Select>
          {error && <Text color="red.500">{error}</Text>}
          {sortedCompetitions.length > 0 && (
            <SimpleGrid columns={gridColumns} spacing={6} w="100%">
              {sortedCompetitions.map((result) => (
                <Box key={result.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                  <Link as={RouterLink} to={`/competition/${result.slug}`}>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>{result.title}</Text>
                  </Link>
                  <Text fontSize="sm">Finished: {new Date(result.deadlineDate).toLocaleDateString()}</Text>
                  <Link href={`https://www.kaggle.com/competitions/${result.slug}`} isExternal>
                    <Text fontSize="sm">Link to Competition</Text>
                  </Link>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </form>
    </Container>
  );
};

export default SearchPage;
