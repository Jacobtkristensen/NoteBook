import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function App() {

const [text, setText] = useState('')

const notes = [{key:1}]

  function buttonHandler() {
    alert("you typed " + text)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notebook <br></br> </Text>
      <TextInput style={styles.TextInput} onChangeText={(txt) => setText(txt)}></TextInput>
      <Button title="Add to list" onPress={buttonHandler}></Button>
      <FlatList  />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
  },
  TextInput: {
    backgroundColor: 'lightblue' ,
    minHeight: 30,
    minWidth: 200,
    marginBottom: 10
  },
});
