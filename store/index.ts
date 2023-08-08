import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../utils";

interface UserProfile {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface AuthStore {
  userProfile: UserProfile | null;
  allUsers: any[]; // Update this type to match your actual user data structure

  addUser: (user: UserProfile) => void;
  removeUser: () => void;

  fetchAllUsers: () => Promise<void>;
}

const authStore = (set: (updater: Partial<AuthStore>) => void) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: UserProfile) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create(
  persist<AuthStore>(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
