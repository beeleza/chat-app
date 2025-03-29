import { create } from "zustand"; // estado global para gerenciar autenticação
import { axiosInstance } from "../lib/axios";

// `userAuthStore` é um hook de estado global
export const userAuthStore = create((set) => ({ // `set` é uma função do zustand usada para atualizar o estado
    // estados iniciais
    authUser: null, // guarda os dados do usuário autenticado (ou null se não tiver logado)
    isSigninUp: false, // indica se o usuario está se cadastrando
    isLoggingIn: false, // indica se o usuário está tentando fazer login
    isUpdatingProfile: false, // indica se o usuário está atualizando o perfil
    error: null,

    isCheckingAuth: true, // true enquanto o sistema verifica se o usuário já está autenticado

    clearError: () => set({ error: null }),

    // objetivo: verifica se o usuario ja está autenticado ao carregar a aplicação
    checkAuth: async () => {
        try {
            // faz uma requisição `GET` para `http://localhost:5051/api/auth/check`
            const res = await axiosInstance.get("/auth/check");

            // se der certo: atualiza authUser com os dados do usuário retornados
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            // se der erro: define authUser como null
            set({ authUser: null });
        } finally {
            // Finaliza a verificação
            set({ isCheckingAuth: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data, error: null });
            return { success: true }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              "Loging failed. Please try again.";
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
        } finally {
            set({ isSigninUp: false });
        }
    },

    signup: async (data) => {
        set({ isSigninUp: true, error: null });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data, error: null });
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              "Registration failed. Please try again.";
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
        } finally {
            set({ isSigninUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            return { success: true }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              "Logout failed. Please try again.";
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
        }
    },
}));
