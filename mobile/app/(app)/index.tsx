import { Text, View } from 'react-native';

import { useSession } from '../../src/ctx';
import { Link } from 'expo-router';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Testes disponíveis</Text>
      <Link href="/updownhand/tutorial">Up Down Hand</Link>
      <Link href="/heelrise/tutorial">Heel Rise</Link>
      <Link href="/history">Histórico de testes</Link>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Logout
      </Text>
    </View>
  );
}
