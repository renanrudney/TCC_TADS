import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from '@rneui/themed';
import { Link } from 'expo-router';

export default function Tutorial() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Neste teste você deve,{'\n'}
        segurando o seu smartphone na mão e com o braço totalmente esticado,{'\n'}
        fazer o movimento de subida e descida repetidas vezes por um intervalo de 10 segundos.
      </Text>
      <Image
        source={require("@/assets/images/updownarm.png")}
        style={styles.image}
      />
      <Link style={styles.button} replace href="../runner">Pronto</Link>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 32,
    },
    text: {
      fontSize: 20,
      fontWeight: '500',
      flex: 1
    },
    image: {
      width: '60%',
      height: '55%',
      alignSelf: 'center',
      aspectRatio: 1,
      padding: 20
    },
    button: {
      padding: 4,
      fontSize: 24,
      width: 160,
      backgroundColor: '#145a73',
      color: '#fff',
      textAlign: 'center',
      borderRadius: 50,
      margin: 20
    },
});
