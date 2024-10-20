import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    role: null, // Role can be 'admin', 'user', etc.
  }),
  actions: {
    login(userRole) {
      this.isAuthenticated = true;
      this.role = userRole;
    },
    logout() {
      this.isAuthenticated = false;
      this.role = null;
    },
  },
});
