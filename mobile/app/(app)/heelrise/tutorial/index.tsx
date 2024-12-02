import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from '@rneui/themed';
import { LinkButton } from '@/components/LinkButton';

export default function Tutorial() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Neste teste você deve{'\n'}elevar
        seu calcanhar{'\n'}repetidas vezes{'\n'}
        por um intervalo de 10 segundos.
      </Text>
      <Image
        source={require("@/assets/images/heelrise.png")}
        style={styles.image}
      />
      <LinkButton href="/heelrise/runner" text='Pronto'/>
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
});
