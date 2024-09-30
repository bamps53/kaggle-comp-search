import { create } from "zustand";
import { Competition } from "../services/api";

interface SearchStore {
  competitions: Competition[];
  setCompetitions: (results: Competition[]) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  competitions: [],
  setCompetitions: (results: Competition[]) => set({ competitions: results }),
}));

export default useSearchStore;
