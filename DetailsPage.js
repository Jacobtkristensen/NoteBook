import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

export const DetailsPage = ({navigation, route }) => {
    const message = route.params?.message
    const [text, setText] = useState(message.content)

    function saveAndGoToHome(){
        
        navigation.navigate("Home", {content: text, key: message.key})    
    }

    async function updateNote(item) {
        try{
          await updateDoc(doc(database, "notes", item.id),{content: item.content});
        }catch(error) {
          console.log("Error updating note: ", error)
        }
      }
    return(
        <View style={styles.container}>
        <Button style ={styles.saveButton}title="Save Note" onPress={() => saveAndGoToHome(text)} />
        <TextInput 
            value={text}
            onChangeText={setText}
            multiline={true}
            style={styles.input}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25282e',
        color: '#fff',
        paddingHorizontal: 15,
        justifyContent: 'center',
      },
    input: {
        flex:0.75,
        backgroundColor: "#ade6bb",
    },
    saveButton: {
        flex: 0.25,
        backgroundColor: "#ade6bb",
    }
})