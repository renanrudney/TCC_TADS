import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';

export default function GetDataSensors() {
  const [collecting, setCollecting] = useState(false);

  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 })
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 })

  const [accelerometerArray, setAccelerometerArray] = useState([])
  const [gyroscopeArray, setGyroscopeArray] = useState([])

  const [accelerometerSubscription, setAccelerometerSubscription] = useState(null);
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);

  const { session } = useSession()

  const handleAccelerometer = (data) => {
    console.log(data)
    Object.assign(data, { timestamp: Date.now() / 1000 })
    setAccelerometerArray(prevData => [...prevData, data])
    setAccelerometerData(data)
  }

  const handleGyroscope = (data) => {
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
      setTimeout(_unsubscribe, 10000)
    }
  }, [collecting])

  const startCollecting = () => {
    setCollecting(true)
    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);
    _subscribe()
  }

  const clear = () => { setAccelerometerArray([]), setGyroscopeArray([])}

  const formatData = (dataArray) => {
    return dataArray.map(data => Object.assign({}, { x_axis: data.x, y_axis: data.y, z_axis: data.z, realizado: data.timestamp }))
  }

  const sendDataToServer = async (data) => {
    serverAPI.post('up_down_arm_resultados', data, { headers: { "Authorization": 'Bearer ' + session } }).then(res => console.log(res)).catch(err => console.log(err))
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

      // console.log(session)

      // const serverUrl = 'http://192.168.1.36:3000/create';
      // const serverUrl = 'http://172.16.0.115:3000/create';
      // const serverUrl = process.env.URL_CREATE;

      // axios.post(serverUrl, data, {
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      // })
      // .then(response => {
      //     console.log('Data sent to server successfully:', response.data);
      // })
      // .catch(error => {
      //     if (error.response) {
      //         // Server responded with a status other than 200 range
      //         console.log('error.response.data', error.response.data);
      //         console.log('error.response.status', error.response.status);
      //         console.log('error.response.headers', error.response.headers);
      //       } else if (error.request) {
      //         // Request was made but no response was received
      //         console.log('error.request', error.request);
      //       } else {
      //         // Error occurred in setting up the request
      //         console.error("Error", error.message);
      //       }
      // });
  };

  return (
      <View style={styles.container}>
      <Text>Data Collection Status: {collecting ? "Collecting..." : "Stopped"}</Text>
      {/* <Text>Accelerometer count: {sensorData.accelerometer.length}</Text>
      <Text>Gyroscope count: {sensorData.gyroscope.length}</Text> */}

      <Button title="Start Collecting Data" onPress={startCollecting} disabled={collecting} />
      <Button title="Force Disable" onPress={_unsubscribe} disabled={!collecting} />

      <Button title="Clear" onPress={clear} disabled={collecting} />
      <Button title="Send Data to Server" onPress={handleTest} disabled={collecting || (accelerometerArray.length === 0 && gyroscopeArray.length === 0)} />

      <Text style={styles.heading}>Accelerometer Data:</Text>
      <Text>X: {accelerometerData.x.toFixed(2)} Y: {accelerometerData.y.toFixed(2)} Z: {accelerometerData.z.toFixed(2)} Timestamp: {accelerometerData.timestamp}</Text>
      {/* <FlatList
          data={sensorData.accelerometer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <Text>X: {item.x.toFixed(2)} Y: {item.y.toFixed(2)} Z: {item.z.toFixed(2)}</Text>
          )}
      /> */}

      <Text style={styles.heading}>Gyroscope Data:</Text>
      <Text>X: {gyroscopeData.x.toFixed(2)} Y: {gyroscopeData.y.toFixed(2)} Z: {gyroscopeData.z.toFixed(2)} Timestamp: {gyroscopeData.timestamp}</Text>
      {/* <FlatList
          data={sensorData.gyroscope}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <Text>X: {item.x.toFixed(2)} Y: {item.y.toFixed(2)} Z: {item.z.toFixed(2)}</Text>
          )}
      /> */}
  </View>
  );
};
// export default function GetDataSensors() {
//     const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0, ...});
//     const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
    
//     useEffect(() => {
//         // Subscribe to accelerometer data
//         const accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
//             setAccelerometerData(accelerometerData);
//             Accelerometer.setUpdateInterval(1000);
//         });

//         // Subscribe to gyroscope data
//         const gyroscopeSubscription = Gyroscope.addListener(gyroscopeData => {
//             setGyroscopeData(gyroscopeData);
//             Gyroscope.setUpdateInterval(1000);
//         });

//         // Return cleanup functions to unsubscribe from sensors
//         return () => {
//             accelerometerSubscription.remove();
//             gyroscopeSubscription.remove();
//         };
//     }, []);

//     const testServer = () => {
//         axios.get('http://172.16.0.115:3000/')
//         .then(
//             console.log('GET successfull')
//         )
//         .catch(error => {
//             if (error.response) {
//                 // Server responded with a status other than 200 range
//                 console.log('error.response.data', error.response.data);
//                 console.log('error.response.status', error.response.status);
//                 console.log('error.response.headers', error.response.headers);
//               } else if (error.request) {
//                 // Request was made but no response was received
//                 console.log('error.request', error.request);
//               } else {
//                 // Error occurred in setting up the request
//                 console.error("Error", error.message);
//               }
//         })
//     }

//     const sendDataToServer = () => {
//         const data = {
//             realizado: new Date().toISOString(),
//             // accelerometer: accelerometerData,
//             // gyroscope: gyroscopeData,
//             x_axis: accelerometerData.x,
//             y_axis: accelerometerData.y,
//             z_axis: accelerometerData.z
//         };
    
//         axios.post('http://172.16.0.115:3000/create', data, console.log('Mandando para o server...'), {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => {
//             console.log('Data sent to server successfully:', response.data);
//         })
//         .catch(error => {
//             console.error('Error sending data to server:', error);
//         });
//     };

//     return (
//         <View style={styles.container}>
//             <Text>Accelerometer:</Text>
//             <Text>X: {accelerometerData.x.toFixed(6)}</Text>
//             <Text>Y: {accelerometerData.y.toFixed(6)}</Text>
//             <Text>Z: {accelerometerData.z.toFixed(6)}</Text>

//             <Text>Gyroscope:</Text>
//             <Text>X: {gyroscopeData.x.toFixed(6)}</Text>
//             <Text>Y: {gyroscopeData.y.toFixed(6)}</Text>
//             <Text>Z: {gyroscopeData.z.toFixed(6)}</Text>

//             <Button title="Send Data to Server" onPress={sendDataToServer} />
//             <Button title="Test Server" onPress={testServer} />
//         </View>
//     );
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});
