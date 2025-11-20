import { create } from 'zustand';
import { PublicKey } from '@solana/web3.js';
import { WalletConnection } from '@/types';

interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  walletName: string | null;
  balance: number;
  connection: WalletConnection | null;
  connect: (wallet: WalletConnection) => void;
  disconnect: () => void;
  updateBalance: (balance: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  connected: false,
  publicKey: null,
  walletName: null,
  balance: 0,
  connection: null,
  connect: (wallet) => set({
    connected: true,
    publicKey: new PublicKey(wallet.publicKey),
    walletName: wallet.wallet,
    connection: wallet,
  }),
  disconnect: () => set({
    connected: false,
    publicKey: null,
    walletName: null,
    balance: 0,
    connection: null,
  }),
  updateBalance: (balance) => set({ balance }),
}));

