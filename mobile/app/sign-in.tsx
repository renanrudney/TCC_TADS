import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { ToastError } from '@/components/ToastError';

export default function SignIn() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.logoContainer}>
        <Text style={{ fontSize: 42, textAlign: 'center' }}>Testes{'\n'}Parkinson</Text>
      </View>
      <View style={{ backgroundColor: '#145a73', width: '100%', flex: 1 }}>
        <LoginForm />
      </View>
    </SafeAreaView>
  )
}

const schema = yup.object().shape({
  login: yup.string().required('Login não pode ficar em branco.'),
  senha: yup.string().required('Senha não pode ficar em branco.'),
});

const LoginForm = () => {
  const { signIn } = useSession();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = () => {
    router.navigate("/sign-up")
  }

  const onSubmit = (data: { login: string, senha: string }) => {
    serverAPI.post('/login', { login: data.login, senha: data.senha })
      .then(res => {
        signIn(res.data.token)
        router.replace('/')
      })
      .catch(err => ToastError(err?.response?.data))
  };

  return (
    <View style={{ margin: 48, gap: 36 }}>
      <View>
        <Text style={styles.inputLabel}>Login</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Login"
              style={styles.input}
            />
          )}
          name="login"
        />
        {errors.login && <Text style={styles.error}>{errors.login.message}</Text>}
      </View>
      <View>
        <Text style={styles.inputLabel}>Senha</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholder="Senha"
              style={styles.input}
            />
          )}
          name="senha"
        />
        {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}
        <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 8 }}>
          <Text style={{ color: 'white', fontWeight: 'semibold' }}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: { width: '100%', height: '50%', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' },
  inputLabel: { color: 'white', fontWeight: 'bold' },
  input: { backgroundColor: 'white', padding: 6 },
  error: { color: 'red', fontWeight: 'bold' },
  button: {
    padding: 4,
    width: 160,
    backgroundColor: 'white',
    color: '#145a73',
    borderRadius: 50,
    alignSelf: 'center',
  },
  buttonText: { textAlign: 'center', fontSize: 24, fontWeight: 'bold'}
});
