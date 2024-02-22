import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { DetailsPage } from './detailspage.js';
export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home} />
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const Home = ({ navigation, route }) => {

  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
   const unsubscribe = navigation.addListener('focus', () => {
    updateList(route.params?.key, route.params?.content); 
  })
  return unsubscribe;
}, [navigation, route.params]); 

function updateList(key, content) {
  const newList = notes.map(note => {
    if(key === note.key) {
      return {... note, content: content};
    }
    return note;
  })
  setNotes(newList);
}
  function buttonHandler() {
    setNotes([...notes, { key: notes.length, content: text}]);
    setText('');
  }
  
  function goToDetailsPage(item) {
    navigation.navigate("DetailsPage", {message: item});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notebook</Text>
      <View style={styles.row}>
        <TextInput style={styles.TextInput} onChangeText={(txt) => setText(txt)} value={text}/>
        <Button title="ADD NOTE" onPress={buttonHandler} />
      </View>
      <FlatList style={styles.list}
        data={notes}
        renderItem={(note) => <TouchableOpacity style={styles.noteTouch} onPress={() =>
          goToDetailsPage(note.item)}><Text>{note.item.content}</Text></TouchableOpacity>} />
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

  },
  noteTouch: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ade6bb',
    borderRadius: 5,
  }
});
