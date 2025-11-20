import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { WalletProvider } from './src/components/WalletProvider';
import { ThemeProvider } from './src/components/ThemeProvider';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <WalletProvider>
          <ThemeProvider>
            <MainScreen />
            <StatusBar style="auto" />
          </ThemeProvider>
        </WalletProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

