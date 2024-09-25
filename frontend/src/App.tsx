import React from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CompetitionDetailsPage from './pages/CompetitionDetailsPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Header />
          <Container maxW="container.xl" flex="1" py={8}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/competition/:id" element={<CompetitionDetailsPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
