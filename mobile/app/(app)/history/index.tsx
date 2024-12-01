import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon, Dialog, CheckBox, Divider, Button } from '@rneui/themed'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { serverAPI } from '@/api/serverApi';
import { useSession } from '@/src/ctx';
import { ToastError } from '@/components/ToastError';

export default function History() {
  const { session } = useSession()
  const [data, setData] = useState<any>({})
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [params, setParams] = useState<loadParams>({})
  const [checked, setChecked] = useState(0)
  const [confirmedChecked, setConfirmedChecked] = useState(0)
  const [visible, setVisible] = useState(false)

  const testTypes = ['up_down_arm', 'heel_rise']

  const loadResults = async (params?: loadParams) => {
    serverAPI.get('/resultados', { headers: { "Authorization": 'Bearer ' + session  }, params})
    .then(res => {setData(res.data), setResults(res.data.records)})
    .catch(err => console.log(err))
  }

  const loadMoreResults = () => {
    if(data.meta.pages > page) {
      const paginated = params
      Object.assign(paginated, { page: page + 1 })
      serverAPI.get('/resultados', { headers: { "Authorization": 'Bearer ' + session  }, params})
      .then(res => {setData(res.data), setResults([...results, ...res.data.records]), setPage(res.data.meta.page)})
      .catch(err => console.log(err))
    }
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
      const typeParams = Object.assign({...params}, { type: testTypes[checked - 1], page: 1 })
      setConfirmedChecked(checked)
      setParams(typeParams)
    }
  }

  const clearType = () => {
    toggleTypeDialog();
    setChecked(0)
    setParams(Object.assign({...params}, { type: undefined, page: 1 }))
  }

  const toggleTypeDialog = () => {
    setVisible(!visible);
  }

  const deleteTest = (item: RenderItem["item"], reset: () => void) => {
    Alert.alert('Excluir resultado', 'Deseja realmente excluir o resultado de teste?', [
      { text: 'Cancelar' }, { text: 'Continuar', onPress: () => { handleDelete(item), reset() } }
    ])
  }

  const handleDelete = (item: RenderItem["item"]) => {
    const selfUrl = item.links.at(0)?.href as string
    serverAPI.delete(selfUrl, { headers: { "Authorization": 'Bearer ' + session  } }).then(() => {
      const updatedResults = results.filter(r => (r.id !== item.id || r.type !== item.type) )
      setResults(updatedResults)
    }).catch((err) => { ToastError('Ocorreu um erro ao excluir. Tente novamente mais tarde.'), console.log(err.response.data) })
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
      <ListItem.Swipeable
        // leftContent={(reset) => (
        //   <Button
        //     title="Info"
        //     onPress={() => reset()}
        //     icon={{ name: 'info', color: 'white' }}
        //     buttonStyle={{ minHeight: '100%' }}
        //   />
        // )}
        rightContent={(reset) => (
          <Button
            title="Excluir"
            onPress={() => deleteTest(item, reset)}
            icon={{ name: 'delete', color: 'white' }}
            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          />
        )}
      >
        <Icon name={itemType.icon} type="material-community" color="grey" />
        <ListItem.Content>
          <ListItem.Title>{`Teste ${itemType.title} - ${item.id}`}</ListItem.Title>
          <ListItem.Subtitle>{itemDate}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
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
        <Dialog.Button title="LIMPAR" onPress={clearType} />
        <Dialog.Button title="CANCELAR" onPress={toggleTypeDialog} />
          <Dialog.Button
            title="CONFIRMAR"
            onPress={handleType}
          />
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
        onEndReached={loadMoreResults}
        onEndReachedThreshold ={0.1}
      />
    </SafeAreaView>
  );
};

interface RenderItem {
  item: {
    type: "up_down_arm" | "heel_rise" | "hitpoint"
    realizado: number
    id: number
    links: [{
      href: string, rel: string
    }]
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
