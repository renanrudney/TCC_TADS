import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Dialog, CheckBox, Divider } from '@rneui/themed'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';

export default function History() {
  const { session } = useSession()
  const [results, setResults] = useState([])
  const [show, setShow] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [params, setParams] = useState<loadParams>({})
  const [checked, setChecked] = useState(0)
  const [confirmedChecked, setConfirmedChecked] = useState(0)
  const [visible, setVisible] = useState(false)

  const testTypes = ['up_down_arm', 'heel_rise']

  const loadResults = async (params?: loadParams) => {
    serverAPI.get('/resultados', { headers: { "Authorization": 'Bearer ' + session  }, params})
    .then(res => setResults(res.data.records))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    loadResults(params)
  }, [params]);

  const handleDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    const { type } = event
    if(type == 'dismissed')
      return
    const currentDate = selectedDate || new Date
    if(currentDate.toISOString().split('T')[0] != date?.toISOString().split('T')[0]) {
      setDate(currentDate);
      const dateParams = Object.assign({...params}, { date: currentDate })
      setParams(dateParams)
    }
  }

  const handleType = () => {
    toggleTypeDialog();
    if(confirmedChecked != checked) {
      const typeParams = Object.assign({...params}, { type: testTypes[checked - 1] })
      setConfirmedChecked(checked)
      setParams(typeParams)
    }
  }

  const toggleTypeDialog = () => {
    setVisible(!visible);
  }

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
    <SafeAreaView style={styles.container}>
      {show && (<DateTimePicker
        value={date || new Date}
        mode={'date'}
        onChange={handleDate}
      />)}

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleTypeDialog}
      >
        <Dialog.Title title="Selecionar Tipo"/>
          {testTypes.map((l, i) => (
            <CheckBox
              key={i}
              title={l}
              containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked === i + 1}
              onPress={() => setChecked(i + 1)}
            />
          ))}

        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={handleType}
          />
          <Dialog.Button title="CANCEL" onPress={toggleTypeDialog} />
        </Dialog.Actions>
      </Dialog>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.barRow} onPress={() => setShow(true)}>
          <Text style={styles.barText}>{date ? date.toLocaleDateString('pt-BR') : 'Pesquise pela data...'}</Text>
          <Icon name='calendar-month' type="material-community" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.barRow} onPress={toggleTypeDialog}>
          <Text style={styles.barText}>{checked === 0 ? 'Pesquise pelo tipo de teste...' : testTypes[checked - 1] }</Text>
          <Icon name='clipboard-account-outline' type="material-community" />
        </TouchableOpacity>
      </View>
      <Divider width={1}/>
      <FlatList
        data={results}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

interface RenderItem {
  item: {
    type: "up_down_arm" | "heel_rise" | "hitpoint"
    realizado: number
    id: number
  }
}

interface loadParams {
  date?: Date
  type?: string
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    barContainer: {
      flex: 1
    },
    actions: {
      backgroundColor: 'white',
      alignItems: 'center',
      padding: 10,
      gap: 10
    },
    barRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      height: 'auto',
      backgroundColor: '#d7d7d7'
    },
    barText: {
      fontWeight: 'bold'
    }
});