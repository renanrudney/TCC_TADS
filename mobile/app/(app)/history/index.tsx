import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';

export default function GetDataSensors() {
  const { session } = useSession()
  const [results, setResults] = useState([])

  const loadResults = async () => {
    serverAPI.get('/resultados', { headers: { "Authorization": 'Bearer ' + session  }})
    .then(res => setResults(res.data.records))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadResults()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Histórico</Text>
      <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text>ID: {item.id} Type: {item.type}</Text>
            )}
        />
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
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});
