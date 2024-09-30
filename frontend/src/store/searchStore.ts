import { create } from "zustand";
import { CompetitionDetails, CompetitionDetails } from "../services/api";

interface SearchStore {
  searchResults: CompetitionDetails[];
  setSearchResults: (results: CompetitionDetails[]) => void;
  competitionDetails: CompetitionDetails | null;
  setCompetitionDetails: (details: CompetitionDetails | null) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  setSearchResults: (results: CompetitionDetails[]) =>
    set({ searchResults: results }),
  competitionDetails: null,
  setCompetitionDetails: (details: CompetitionDetails | null) =>
    set({ competitionDetails: details }),
}));

export default useSearchStore;
