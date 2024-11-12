import { Slot, Navigator, Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HistoryLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Histórico de testes',
          headerStyle: { backgroundColor: '#145a73' },
          headerTintColor: '#fff',
        }}
      />
        <Slot />
    </>
  );
}
