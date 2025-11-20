import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWallet } from '@solana/wallet-adapter-react';

export const Portfolio: React.FC = () => {
  const { publicKey } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>0.0000 SOL</Text>
        <Text style={styles.balanceUsd}>≈ $0.00 USD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  balanceContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  balanceUsd: {
    fontSize: 16,
    color: '#a0a0a0',
  },
});

