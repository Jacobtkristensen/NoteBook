import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { DetailsPage } from './DetailsPage.js';
import { database } from './firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useCollection} from 'react-firebase-hooks/firestore'; //install with npm install react-firebase-hooks
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

  const [values , loading, error] = useCollection(collection(database, "notes"));
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}));
  //alert(JSON.stringify(database, null, 4));
  
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
async function buttonHandler() {
    setNotes([...notes, { key: notes.length, content: text}]);
    setText('');
    
    try {
      await addDoc(collection(database, "notes"),{content: text});
    } catch(error) {
      console.log("Error adding document: ", error)
    }
  }
async function deleteNote (item) {
  try{
    await deleteDoc(doc(database, "notes", item.id));
    console.log("Note deleted");
  } catch(error) {
    console.log("Error deleting note: ", error)
  }
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
        data={data}
        renderItem={(note) => (
          <View style={styles.noteContainer}>
            <TouchableOpacity 
              style={styles.noteTouch} 
              onPress={() => goToDetailsPage(note.item)}
            >
              <Text>{note.item.content}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.deleteTouch} 
              onPress={() => deleteNote(note.item)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
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

  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTouch: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ade6bb',
    borderRadius: 5,
  },
  deleteTouch: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  }
});
