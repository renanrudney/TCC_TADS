import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { ToastError } from '@/components/ToastError';

export default function SignIn() {
  const { signIn } = useSession();
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder='Login'
        onChangeText={setLogin}
      />
      <TextInput
        placeholder='Password'
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text
        onPress={() => {
          serverAPI.post('/login', { login: login, senha: password })
            .then(res => {
              signIn(res.data.token)
              router.replace('/')
            })
            .catch(err => ToastError(err.response.data))
        }}>
        Sign In
      </Text>
    </View>
  );
}
