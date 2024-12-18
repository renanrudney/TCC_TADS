import { Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CheckBox, Icon } from '@rneui/themed';

import { serverAPI } from '@/api/serverApi';
import { ToastError } from '@/components/ToastError';

export default function SignUp() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: '#145a73', width: '100%', flex: 1 }}>
          <SignUpForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const schema = yup.object().shape({
  nome: yup.string().required('Nome não pode ficar em branco.'),
  sobrenome: yup.string().required('Sobrenome não pode ficar em branco.'),
  cpf: yup.string().required('CPF não pode ficar em branco.').length(11, 'CPF deve conter 11 caracteres.'),
  login: yup.string().required('Login não pode ficar em branco.'),
  senha: yup.string().required('Senha não pode ficar em branco.'),
});

const SignUpForm = () => {
  const [genero, setGenero] = useState('M')
  const [nivel, setNivel] = useState(0)
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date('1990-01-02'))
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { cpf: string, login: string, nome: string, sobrenome: string, senha: string }) => {
    const formData = Object.assign({...data}, {nascimento: date, comum_attributes: { genero: genero, nivel_sintoma: nivel } })
    
    serverAPI.post('/registro', formData)
      .then(_res => {
        router.replace('/')
      })
      .catch(err => ToastError(err?.response?.data))
  };

  const handleDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    const { type } = event
    if(type == 'dismissed')
      return
    const currentDate = selectedDate || new Date
    if(currentDate.toISOString().split('T')[0] != date?.toISOString().split('T')[0]) {
      setDate(currentDate);
    }
  }

  return (
    <View style={{ margin: 48, gap: 16, flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 48 }}>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Icon name='arrow-left' type="material-community" color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
          Cadastro
        </Text>
      </View>
      <View>
        <Text style={styles.inputLabel}>Nome</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nome"
              style={styles.input}
            />
          )}
          name="nome"
        />
        {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
      </View>
      <View>
        <Text style={styles.inputLabel}>Sobrenome</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Sobrenome"
              style={styles.input}
            />
          )}
          name="sobrenome"
        />
        {errors.sobrenome && <Text style={styles.error}>{errors.sobrenome.message}</Text>}
      </View>
      <View>
        <Text style={styles.inputLabel}>CPF</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="CPF"
              style={styles.input}
              keyboardType='number-pad'
            />
          )}
          name="cpf"
        />
        {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
      </View>
      <View>
        <Text style={styles.inputLabel}>Data de nascimento</Text>
        <TouchableOpacity onPress={() => setShow(true)} style={{}}>
          <Text style={styles.inputNasc}>{date.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
        {show && (<DateTimePicker
          value={date}
          mode={'date'}
          onChange={handleDate}
        />)}
      </View>
      <View style={{ flex: 1 }} >
        <Text style={styles.inputLabel}>Sexo</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>
          <CheckBox
            checked={genero === 'M'}
            onPress={() => setGenero('M')}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'Masculino'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={genero === 'F'}
            onPress={() => setGenero('F')}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'Feminino'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} >
        <Text style={styles.inputLabel}>Qual o nível dos seus sintomas?</Text>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>
          <CheckBox
            checked={nivel === 0}
            onPress={() => setNivel(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'0'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={nivel === 1}
            onPress={() => setNivel(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'1'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={nivel === 2}
            onPress={() => setNivel(2)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'2'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={nivel === 3}
            onPress={() => setNivel(3)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'3'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={nivel === 4}
            onPress={() => setNivel(4)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'4'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
          <CheckBox
            checked={nivel === 5}
            onPress={() => setNivel(5)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'5'}
            textStyle={{ color: 'white' }}
            checkedColor='white'
            containerStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      </View>
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
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: { color: 'white', fontWeight: 'bold' },
  input: { backgroundColor: 'white', padding: 6 },
  inputNasc: { backgroundColor: 'white', padding: 12 },
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
