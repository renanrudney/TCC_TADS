import { RootSiblingParent } from 'react-native-root-siblings';
import { SessionProvider } from '@/src/ctx';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
