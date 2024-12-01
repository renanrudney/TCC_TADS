import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed'

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { ToastError } from '@/components/ToastError';


export default function Profile() {
  const { session } = useSession()
  const [data, setData] = useState<any>(null)

  const loadProfile = () => {
    serverAPI.get('/registro', { headers: { "Authorization": 'Bearer ' + session  }})
      .then(res => setData(res.data))
      .catch(err => {ToastError('Ocorreu um erro ao carregar perfil. Tente novamente mais tarde.'), console.log(err)})
  }

  useEffect(() => {
    loadProfile()
  }, []);

  const idade = (nascimento: string) => {
    if(!nascimento)
      return "--"
    const bday = new Date(nascimento)
    const distance = (new Date()).getTime() - bday.getTime()
    const days = Math.floor(distance/(1000 * 60 * 60 * 24))
    return Number((days/365).toFixed(0))
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', height: '50%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name='person' size={100} />
        <Text style={styles.description}>{`${data?.nome} ${data?.sobrenome}, ${idade(data?.nascimento)}`}</Text>
        <Text style={styles.description}>{`Nível de sintomas: ${data?.nivel_sintoma}`}</Text>
      </View>
      <View style={{ width: '100%', flex: 1 }}>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16
  }
});
