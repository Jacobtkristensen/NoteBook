import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function App() {

  const [text, setText] = useState('')

  const [notes, setNotes] = useState([])

  function buttonHandler() {
    setNotes([...notes, { key: notes.length, name: text }])
    setText('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notebook</Text>
      <View style={styles.row}>
        <TextInput style={styles.TextInput} onChangeText={(txt) => setText(txt)} value={text} />
        <Button title="ADD NOTE" onPress={buttonHandler} />
      </View>
      <FlatList style={styles.list}
        data={notes}
        renderItem={({ item }) => <Text style={styles.listItems}>{item.name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25282e',
    color: '#fff',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'lightblue',
    marginBottom: 20,
    marginTop: 100
  },
  TextInput: {
    flex: 1,
    backgroundColor: 'lightblue',
    minHeight: 30,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  listItems: {
    color: 'lightblue',
    fontSize: 20,
    paddingVertical: 4,
  },
  list: {
    alignSelf: 'stretch',
    marginHorizontal: 20,

  }
});
