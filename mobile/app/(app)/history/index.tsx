import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon } from '@rneui/themed'

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';

export default function History() {
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

  const renderItem = ({ item }: RenderItem) => {
    var itemType
    if (item.type === "up_down_arm")
      itemType = { icon: "human-greeting", title: "Up Down Arm" }
    else if (item.type === "heel_rise")
      itemType = { icon: "human-male-height-variant",title: "Heel Rise" }
    else
      itemType = { icon: "gesture-tap-box",title: "Hit the Point" }

    const itemDate = new Date(item.realizado).toLocaleString('pt-BR')

    return (
      <ListItem bottomDivider>
        <Icon name={itemType.icon} type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>{`Teste ${itemType.title} - ${item.id}`}</ListItem.Title>
          <ListItem.Subtitle>{itemDate}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

interface RenderItem {
  item: {
    type: "up_down_arm" | "heel_rise" | "hitpoint"
    realizado: number
    id: number
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});
