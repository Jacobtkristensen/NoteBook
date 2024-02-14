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
      <Text style={styles.title}>Notebook <br></br> </Text>
      <TextInput 
      style={styles.TextInput} onChangeText={(txt) => setText(txt)} value={text}></TextInput>
      <Button title="Add to list" onPress={buttonHandler}></Button>
      <FlatList style={styles.list}
        data={notes}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25282e',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'lightblue',
  },
  TextInput: {
    backgroundColor: 'lightblue',
    minHeight: 30,
    minWidth: 200,
    marginBottom: 10
  },
  list: {
    color: 'lightblue',
  }
});
