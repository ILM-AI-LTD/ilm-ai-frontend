import { BoardResponse, CountryResponse } from "@/types/student";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetupState {
  country: CountryResponse | null;
  board: BoardResponse | null;
  setCountry: (country: CountryResponse | null) => void;
  setBoard: (board: BoardResponse | null) => void;
  reset: () => void;
}

export const useStudentSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      country: null,
      board: null,
      setCountry: (country) => set({ country }),
      setBoard: (board) => set({ board }),
      reset: () => set({ country: null, board: null }),
    }),
    {
      name: "students-setup", // name of item in localStorage
    }
  )
);
