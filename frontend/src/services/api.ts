import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Update this with the actual backend URL

export interface CompetitionDetails {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  deadlineDate: string;
  createdAt: string;
  updatedAt: string;
}

export const searchCompetitions = async (
  query: string
): Promise<CompetitionDetails[]> => {
  console.log(query);
  try {
    const response = await axios.get(`${API_BASE_URL}/competitions/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching competitions:", error);
    throw error;
  }
};

export const getCompetitionDetails = async (
  slug: string
): Promise<CompetitionDetails> => {
  console.log("slug: " + slug);
  try {
    const response = await axios.get(`${API_BASE_URL}/competitions/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching competition details:", error);
    throw error;
  }
};
