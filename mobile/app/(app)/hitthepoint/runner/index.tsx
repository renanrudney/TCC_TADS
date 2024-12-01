import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { useNavigation } from 'expo-router';
import { Dialog } from '@rneui/themed';
import { StackActions } from '@react-navigation/native';

export default function Runner() {
  const [prepare, setPrepare] = useState(true)
  const [timer, setTimer] = useState(5)

  const [collecting, setCollecting] = useState(true)
  const [running, setRunning] = useState<NodeJS.Timeout>()
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [counter, setCounter] = useState(0)
  const [hitData, setHitData] = useState<any>([])

  const { session } = useSession()
  const navigation = useNavigation()

  useEffect(() => {
    if(timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      setPrepare(false)
      startCollecting()
    }
  }, [timer])

  const handleHit = () => {
    setCounter(counter + 1)
    const data = Object.assign({}, { hit_number: counter, timestamp: Date.now() / 1000 })
    setHitData([...hitData, data])
  }

  useEffect(() => {
    if (collecting) {
      setRunning(setTimeout(_unsubscribe, 10500))
    }
  }, [collecting])

  const _unsubscribe = () => setCollecting(false)

  const startCollecting = () => {
    setCounter(0)
    setSending(false)
    setCollecting(true)
  }

  const stopCollecting = () => {
    clearTimeout(running)
    setCollecting(false)
    setHitData([])
  }

  const sendDataToServer = async (data: any) => {
    setSending(true)
    serverAPI.post('hitpoint_resultados', data, { headers: { "Authorization": 'Bearer ' + session } })
      .then(_res => {
        setSuccess(true)
        console.log(_res.data)
        setTimeout(() => { navigation.dispatch(StackActions.replace('history')) }, 3000)
      })
      .catch(err => {
        console.log(err)
        setSendError(true)
        setTimeout(() => { setSending(false), setSendError(false) }, 3000)
      })
  }

  const handleTest = () => {
    const data = {
      resultado: {
        realizado: new Date().toISOString(),
        qtd_toque: counter,
        intervalo_medio: 10000/counter,
        hit_data_attributes: hitData
      }
    };

    sendDataToServer(data)
  };

  return (
      <View style={styles.container}>
        {prepare ?
          <>
            <Text style={styles.timerText}>Comece a execução dos movimentos daqui a 5 segundos:</Text>
            <Text style={styles.timer}>{timer}</Text>
          </>
          :
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 18, alignItems: 'center' }}>
              <Text style={styles.title}>Dados recentes:</Text>

              <Text style={styles.heading}>Quantidade de hits: {counter}</Text>
            </View>
            {collecting &&
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={styles.collectButton} onPress={handleHit} />
                <Text style={styles.heading}>Coletando...</Text>
              </View>
            }
            <View style={{ flex: 1, gap: 18 }}>
              {!collecting && <Button color={'red'} title="Descartar e iniciar novo teste" onPress={startCollecting} /> }
              {collecting && <Button title="Parar" onPress={stopCollecting} />}
              <Button color={'green'} title="Concluir teste e enviar" onPress={handleTest} disabled={collecting || hitData.length === 0} />
            </View>
          </View>
        }
        <Dialog isVisible={sending}>
          {sendError ? 
            <>
              <Text>Ocorreu um erro ao enviar o teste, tente novamente mais tarde.</Text>
            </>
          :
            <>
              {success ? <>
                <Text>Teste enviado com sucesso!</Text>
              </> : <>
                <Text>Enviando...</Text>
                <Dialog.Loading />
              </>
              }
            </>
          }
        </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
    },
    timerText: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center'
    },
    timer: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    lastData: {
      paddingBottom: 64
    },
    collectButton: {
      width: 150,
      height: 150,
      backgroundColor: 'red',
      borderRadius: 100
    }
});
