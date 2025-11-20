import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Surface } from 'react-native-paper';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../components/WalletButton';
import { SwapInterface } from '../components/SwapInterface';
import { Portfolio } from '../components/Portfolio';

const MainScreen: React.FC = () => {
  const { connected } = useWallet();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Solana Wallet</Text>
        <Text style={styles.subtitle}>Advanced Multi-Platform Wallet</Text>
      </View>

      <View style={styles.content}>
        <WalletButton />
        
        {connected && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <SwapInterface />
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Portfolio />
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    marginBottom: 20,
  },
});

export default MainScreen;

