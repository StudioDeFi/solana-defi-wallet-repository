import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export const SwapInterface: React.FC = () => {
  const [amount, setAmount] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swap Tokens</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.0"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>To</Text>
        <TextInput
          style={styles.input}
          placeholder="0.0"
          placeholderTextColor="#666"
          editable={false}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => {}}
        style={styles.swapButton}
        labelStyle={styles.swapButtonLabel}
      >
        Get Quote
      </Button>
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: '#ffffff',
  },
  swapButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 12,
    marginTop: 8,
  },
  swapButtonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

