import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Tutorial() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Neste teste você deve clicar no botão que aparecerá na tela repetidas vezes em um intervalo de 10 segundos
      </Text>
      <Text style={styles.danger}>Atenção</Text>
      <Text style={styles.text}>
        A execução deve ser focada em movimentos constantes, não necessariamente rápido, apenas faça o melhor que puder
      </Text>
      <Link style={styles.button} replace href="/hitthepoint/runner">Pronto</Link>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 32,
      gap: 24
    },
    text: { fontSize: 20, fontWeight: '500',},
    danger: { color: 'red', fontSize: 32, fontWeight: 'bold' },
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
