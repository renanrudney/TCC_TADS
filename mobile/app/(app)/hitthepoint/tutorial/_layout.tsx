import { Slot, Stack } from 'expo-router';

export default function SensorsLayout() {
  return (
    <>
    <Stack.Screen
        options={{
          title: 'Tutorial Hit the Point',
          headerStyle: { backgroundColor: '#145a73' },
          headerTintColor: '#fff',
        }}
      />
      <Slot />
    </>
  );
}