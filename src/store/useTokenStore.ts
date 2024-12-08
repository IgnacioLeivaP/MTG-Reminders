import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Token {
  id: string;
  name: string;
  power: number;
  toughness: number;
  color: string;
  abilities: string[];
  quantity: number;
}

interface TokenState {
  tokens: Token[];
  addToken: (token: Token) => void;
  removeToken: (id: string) => void;
  updateTokenQuantity: (id: string, change: number) => void;
  resetTokens: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      tokens: [],
      addToken: (token) => set((state) => ({ 
        tokens: [...state.tokens, token] 
      })),
      removeToken: (id) => set((state) => ({ 
        tokens: state.tokens.filter(token => token.id !== id) 
      })),
      updateTokenQuantity: (id, change) => set((state) => ({
        tokens: state.tokens.map(token =>
          token.id === id
            ? { ...token, quantity: Math.max(1, token.quantity + change) }
            : token
        )
      })),
      resetTokens: () => set({ tokens: [] }),
    }),
    {
      name: 'token-storage'
    }
  )
); 