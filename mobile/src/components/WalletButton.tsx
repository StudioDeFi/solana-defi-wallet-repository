import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletButton: React.FC = () => {
  const { publicKey, connected, connect, disconnect } = useWallet();

  if (connected && publicKey) {
    return (
      <View style={styles.container}>
        <Text style={styles.address}>
          {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
        </Text>
        <Button mode="outlined" onPress={disconnect} style={styles.button}>
          Disconnect
        </Button>
      </View>
    );
  }

  return (
    <Button
      mode="contained"
      onPress={() => connect()}
      style={styles.connectButton}
      labelStyle={styles.buttonLabel}
    >
      Connect Wallet
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 20,
  },
  address: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  button: {
    borderColor: '#0ea5e9',
  },
  connectButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 8,
    marginBottom: 20,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

