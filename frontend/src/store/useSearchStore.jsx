import { create } from "zustand";

export const useSearchStore = create((set) => ({
	search: "",
	setSearch: (search) => set({ search }),
}));
