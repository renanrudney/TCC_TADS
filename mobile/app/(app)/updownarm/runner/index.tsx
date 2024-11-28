import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { useNavigation } from 'expo-router';
import { Dialog } from '@rneui/themed';
import { StackActions } from '@react-navigation/native';

export default function Runner() {
  const [prepare, setPrepare] = useState(true)
  const [timer, setTimer] = useState(5)

  const [collecting, setCollecting] = useState(false)
  const [running, setRunning] = useState<NodeJS.Timeout>()
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 })
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 })

  const [accelerometerArray, setAccelerometerArray] = useState([])
  const [gyroscopeArray, setGyroscopeArray] = useState([])

  const [accelerometerSubscription, setAccelerometerSubscription] = useState(null);
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);

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

  const handleAccelerometer = (data: any) => {
    console.log(data)
    Object.assign(data, { timestamp: Date.now() / 1000 })
    setAccelerometerArray(prevData => [...prevData, data])
    setAccelerometerData(data)
  }

  const handleGyroscope = (data: any) => {
    Object.assign(data, { timestamp: Date.now() / 1000 })
    setGyroscopeArray(prevData => [...prevData, data])
    setGyroscopeData(data)
  }

  const _subscribe = () => {
    setAccelerometerSubscription(Accelerometer.addListener(handleAccelerometer));
    setGyroscopeSubscription(Gyroscope.addListener(handleGyroscope));
  };

  const _unsubscribe = () => {
    accelerometerSubscription.remove();
    gyroscopeSubscription.remove();
    setAccelerometerSubscription(null)
    setGyroscopeSubscription(null)
    setCollecting(false)
  };

  useEffect(() => {
    if (collecting) {
      setRunning(setTimeout(_unsubscribe, 10500))
    }
  }, [collecting])

  const startCollecting = () => {
    setSending(false)
    setAccelerometerArray([]), setGyroscopeArray([])
    setCollecting(true)
    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);
    _subscribe()
  }

  const stopCollecting = () => {
    clearTimeout(running)
    _unsubscribe()
    setAccelerometerArray([]), setGyroscopeArray([])
  }

  const formatData = (dataArray: Array<any>) => {
    return dataArray.map(data => Object.assign({}, { x_axis: data.x, y_axis: data.y, z_axis: data.z, timestamp: data.timestamp }))
  }

  const sendDataToServer = async (data: any) => {
    setSending(true)
    serverAPI.post('up_down_arm_resultados', data, { headers: { "Authorization": 'Bearer ' + session } })
      .then(_res => {
        setSuccess(true)
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
        accelerometers_attributes: formatData(accelerometerArray),
        gyroscopes_attributes: formatData(gyroscopeArray)
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
          <>
            {!collecting && <Button color={'red'} title="Descartar e iniciar novo teste" onPress={startCollecting} /> }

            {collecting &&
              <>
                <Text style={styles.heading}>Coletando...</Text>
                <Button title="Parar" onPress={stopCollecting} />
              </>
            }
            <Text style={styles.title}>Dados recentes:</Text>

            <Text style={styles.heading}>Acelerômetro:</Text>
            <Text>X: {accelerometerData.x.toFixed(2)} Y: {accelerometerData.y.toFixed(2)} Z: {accelerometerData.z.toFixed(2)} Timestamp: {accelerometerData.timestamp}</Text>

            <Text style={styles.heading}>Giroscópio:</Text>
            <Text style={styles.lastData}>X: {gyroscopeData.x.toFixed(2)} Y: {gyroscopeData.y.toFixed(2)} Z: {gyroscopeData.z.toFixed(2)} Timestamp: {gyroscopeData.timestamp}</Text>

            <Button color={'green'} title="Concluir teste e enviar" onPress={handleTest} disabled={collecting || (accelerometerArray.length === 0 && gyroscopeArray.length === 0)} />
          </>
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
    }
});
