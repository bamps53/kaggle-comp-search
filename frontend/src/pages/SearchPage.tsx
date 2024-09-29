import React, { useEffect, useState } from 'react';
import { Box, VStack, Input, Text, SimpleGrid, Select, Container, Heading, useBreakpointValue, FormLabel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useSearchStore from '../store/searchStore';
import { searchCompetitions, SearchResult } from '../services/api';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'participants'>('relevance');
  const { searchResults, setSearchResults } = useSearchStore();

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  useEffect(() => {
    const initializeSearchResults = async () => {
      try {
        const results = await searchCompetitions("");
        setSearchResults(results);
      } catch (error) {
        console.error("Error initializing search results:", error);
      }
    };

    initializeSearchResults();
  }, [setSearchResults]);

  const handleSearch = async () => {
    setError(null);
    try {
      const results = await searchCompetitions(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error(err);
    }
  };

  const sortResults = (results: SearchResult[]) => {
    switch (sortBy) {
      case 'date':
        return [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'participants':
        return [...results].sort((a, b) => b.participants - a.participants);
      default:
        return results; // 'relevance' is the default order from the API
    }
  };

  const sortedResults = sortResults(searchResults);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSearch();
  };

  return (
    <Container maxW="container.xl" centerContent>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Search Kaggle Competitions
          </Heading>
          <Input
            id="search-input"
            placeholder="Enter competition name or keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
          />
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date' | 'participants')} size="md">
            <option value="relevance">Sort by Relevance</option>
            <option value="date">Sort by Date</option>
            <option value="participants">Sort by Participants</option>
          </Select>
          {error && <Text color="red.500">{error}</Text>}
          {sortedResults.length > 0 && (
            <SimpleGrid columns={gridColumns} spacing={6}>
              {sortedResults.map((result) => (
                <Box key={result.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                  <Link to={`/competition/${result.slug}`}>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>{result.title}</Text>
                    <Text fontSize="sm">Date: {new Date(result.date).toLocaleDateString()}</Text>
                    <Text fontSize="sm">Participants: {result.participants}</Text>
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
