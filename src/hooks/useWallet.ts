import { useCallback, useEffect, useState } from 'react';
import { useWalletStore } from '@/store/wallet-store';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletConnection } from '@/types';
import { getConnection } from '@/lib/solana';

export const useWalletConnection = () => {
  const { connection } = useConnection();
  const { publicKey, wallet, connected, disconnect: adapterDisconnect } = useWallet();
  const { connect, disconnect, updateBalance } = useWalletStore();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey && wallet) {
      const walletConnection: WalletConnection = {
        wallet: wallet.adapter.name,
        publicKey: publicKey.toString(),
        connected: true,
        adapter: wallet.adapter,
      };
      connect(walletConnection);
      fetchBalance();
    } else {
      disconnect();
    }
  }, [connected, publicKey, wallet]);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !connection) return;
    
    try {
      setLoading(true);
      const balance = await connection.getBalance(publicKey);
      const solBalance = balance / 1e9;
      setBalance(solBalance);
      updateBalance(solBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection, updateBalance]);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [connected, publicKey, fetchBalance]);

  const handleDisconnect = useCallback(() => {
    adapterDisconnect();
    disconnect();
    setBalance(0);
  }, [adapterDisconnect, disconnect]);

  return {
    connected,
    publicKey,
    walletName: wallet?.adapter.name,
    balance,
    loading,
    disconnect: handleDisconnect,
    refreshBalance: fetchBalance,
  };
};

