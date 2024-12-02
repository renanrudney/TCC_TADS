import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { router, Stack, useNavigation } from 'expo-router';
import { Icon, ListItem } from '@rneui/themed';
import { jwtDecode } from "jwt-decode";

import { useSession } from '../../src/ctx';
import { StackActions } from '@react-navigation/native';

export default function Index() {
  const { session, signOut } = useSession();
  const decoded: JwtUser = jwtDecode(session as string)
  const navigation = useNavigation()

  return (
    <>
    <Stack.Screen
      options={{
        headerTitle: '',
        headerStyle: { backgroundColor: '#145a73' },
        headerTintColor: '#fff',
        headerLeft: () => PersonComponent(decoded.nome),
        headerRight: () => ExitButton(signOut)
      }}
    />
    <View style={styles.container}>
      <Text style={styles.text}>Testes disponíveis</Text>
      <ListItem containerStyle={styles.listItem} onPress={() => navigation.dispatch(StackActions.push('updownarm/tutorial'))}>
        <Icon name="human-greeting" type="material-community" color="white" />
        <ListItem.Content>
          <ListItem.Title style={styles.listIemTitle}>Up Down Arm</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem containerStyle={styles.listItem} onPress={() => navigation.dispatch(StackActions.push('heelrise/tutorial'))}>
        <Icon name="human-male-height-variant" type="material-community" color="white" />
        <ListItem.Content>
          <ListItem.Title style={styles.listIemTitle}>Heel Rise</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem containerStyle={styles.listItem} onPress={() => navigation.dispatch(StackActions.push('hitthepoint/tutorial'))}>
        <Icon name="gesture-tap-box" type="material-community" color="white" />
        <ListItem.Content>
          <ListItem.Title style={styles.listIemTitle}>Hit the Point</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
  
      <Text style={styles.text}>Histórico de testes</Text>
      <ListItem containerStyle={styles.listItem} onPress={() => navigation.dispatch(StackActions.push('history'))}>
        <Icon name="clipboard-text-clock-outline" type="material-community" color="white" />
        <ListItem.Content>
          <ListItem.Title style={styles.listIemTitle}>Acessar histórico de testes</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
    </>
  );
}

interface JwtUser {
  nome: string
  usuario_id: number
  exp: number
}

const PersonComponent = (name: string) => {
  return (
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', gap: 8 }} onPress={() => router.navigate('/profile')}>
      <Icon name='account' type="material-community" color={'white'} />
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>{name}</Text>
    </TouchableOpacity>
  )
}

const ExitButton = (signOut: () => void) => (
  <TouchableOpacity onPress={signOut}>
    <Icon name='exit-to-app' color={'white'} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, margin: 24 },
  text: { fontSize: 20, fontWeight: '500' },
  listItem: { backgroundColor: '#145a73', borderRadius: 50 },
  listIemTitle: { color: 'white' }
})
