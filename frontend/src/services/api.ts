import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this with the actual backend URL

export interface SearchResult {
  id: number;
  title: string;
  date: string;
  participants: number;
}

export interface CompetitionDetails {
  id: number;
  title: string;
  description: string;
  dataset: string;
  evaluationMetric: string;
  topSolutions: string[];
  date: string;
  participants: number;
  relatedDiscussions: { title: string; url: string }[];
  relatedBlogPosts: { title: string; url: string }[];
}

export const searchCompetitions = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching competitions:', error);
    throw error;
  }
};

export const getCompetitionDetails = async (id: number): Promise<CompetitionDetails> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/competition/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competition details:', error);
    throw error;
  }
};