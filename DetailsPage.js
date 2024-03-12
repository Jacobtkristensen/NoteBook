import { View, TextInput, Button, StyleSheet, Image } from 'react-native'
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { database, storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const DetailsPage = ({ navigation, route }) => {
  const message = route.params?.message;
  const [text, setText] = useState(message.content);
  const [imagePath, setImagePath] = useState(null);
  
  async function saveAndGoToHome() {
    if (imagePath) {
      try {
    const res = await fetch(imagePath);
    const blob = await res.blob();

    const uniqueFileName = `image_${new Date().getTime()}.jpg`

    const storageRef = ref(storage, uniqueFileName);
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob!');
    });
    } catch(error) {
      console.log("Error uploading image: ", error);
    
    }
  }
    try{
      const noteRef = doc(database, "notes", message.id);
      await updateDoc(noteRef, { content: text });
      console.log("Document updated in Forestorewith ID: ", message.id);
    } catch(error) {
      console.log("Error updating note: ", error);
    }

    navigation.navigate("Home")
  }
  
  // not used in this version
  async function updateNote(item) {
    try{
      const noteRef = doc(database, "notes", message.id);
      await updateDoc(noteRef, { content: text });
      console.log("Document updated in Forestorewith ID: ", message.id);
    } catch(error) {
      console.log("Error updating note: ", error);
    }
  }

  async function uploadImage() {
    const res = await fetch(imagePath);
    const blob = await res.blob();

    const uniqueFileName = `image_${new Date().getTime()}.jpg`

    const storageRef = ref(storage, uniqueFileName);
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob!');
    });
  }

  async function launchImagePicker() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      setImagePath(uri);
    }
  }

  async function takePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();

    console.log(result); 

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      console.log(uri);
      setImagePath(uri);
    } else {
      console.log('Image picker was cancelled or failed');
    }
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
        <Button style={styles.saveButton} title="Take Photo" onPress={takePhoto} />
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
