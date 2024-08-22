import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist(
  (set) => ({
    projects: [],
    tasks: [],
    user: { token: '', role: '' },
    
    setProjects: async (projects) => set({ projects }),
    setTasks: async (tasks) => set({ tasks }),
    setUser: async (user) => set({ user })
  }),
  {
    name: "store",
    getStorage: () => localStorage, 
  }
));

export default useStore;
