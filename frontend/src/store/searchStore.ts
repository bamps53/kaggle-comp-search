import { create } from 'zustand';
import { SearchResult, CompetitionDetails } from '../services/api';

interface SearchStore {
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  competitionDetails: CompetitionDetails | null;
  setCompetitionDetails: (details: CompetitionDetails | null) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  setSearchResults: (results: SearchResult[]) => set({ searchResults: results }),
  competitionDetails: null,
  setCompetitionDetails: (details: CompetitionDetails | null) => set({ competitionDetails: details }),
}));

export default useSearchStore;