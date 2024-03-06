import { View, TextInput, Button, StyleSheet, Image } from 'react-native'
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const DetailsPage = ({ navigation, route }) => {
  const message = route.params?.message;
  const [text, setText] = useState(message.content);
  const [imagePath, setImagePath] = useState(null);
  function saveAndGoToHome() {

    navigation.navigate("Home", { content: text, key: message.key })
  }

  async function updateNote(item) {
    try {
      await updateDoc(doc(database, "notes", item.id), { content: item.content });
    } catch (error) {
      console.log("Error updating note: ", error);
    }
  }
  async function launchImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    })
    if (!result.cancelled) {
      setImagePath(result.assets[0].uri);
    }
  }
  async function uploadImage() {
    const res = await fetch(imagePath);
    const blob = await res.blob();

    const uniqueFileName = `image_${new Date().getTime()}.jpg}`

    const storageRef = ref(storage, uniqueFileName);
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob!');
    });
  }
  async function downloadImage() {
    const storageRef = ref(storage, "myimage.jpg");
    getDownloadURL(storageRef)
      .then((url) => {
        setImagePath(url);
      })
      .catch((error) => {
        console.log("Error downloading image: ", error);
      })
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline={true}
        style={styles.input}
      />
      <Button style={styles.saveButton} title="Save Note" onPress={() => saveAndGoToHome(text)} />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imagePath }} />
        <Button style={styles.downloadButton} title="Download Image" onPress={downloadImage} />
        <Button style={styles.saveButton} title="Add Image" onPress={launchImagePicker} />
        <Button style={styles.uploadButton} title="Upload Image" onPress={uploadImage} />
      </View>
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
  imageContainer: {
    flex: 1,
    backgroundColor: '#25282e',
    color: '#fff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 0.75,
    backgroundColor: "#ade6bb",
  },
  saveButton: {
    flex: 0.25,
    backgroundColor: "#ade6bb",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})