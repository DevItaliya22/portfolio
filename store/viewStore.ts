import { views } from '@prisma/client';
import { create } from 'zustand';


interface ViewState{
    view: views[];
    fetchViews: () => Promise<void>;
}

export const useViewStore = create<ViewState>((set) => ({
    view: [],
    fetchViews: async () => {
      try {
        const res = await fetch('/api/view');
        const data = await res.json();
        set({ view: data.view });
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    },
  }));
  