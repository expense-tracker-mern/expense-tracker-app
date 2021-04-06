import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UploadFile = (props) => {
    let options = {
        title: 'You can choose one image',
        maxWidth: 256,
        maxHeight: 256,
        storageOptions: {
          skipBackup: true
        }
    }

    const openGallery = () => {
        launchImageLibrary(options, response => {
            uploadphoto(options,response);
            props.visible();
        });
    }

    const openCamera = () => {
        launchCamera(options, response => {
            uploadphoto(options,response);
            props.visible();
        });    
    }

    const uploadphoto = (options,response) => {
        console.log({ response });
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = { uri: response.uri };
          console.log({ source });
        }
    }
    return (
        <View style={styles.modal}>
            <View style={{padding: 20}}>
                <TouchableOpacity onPress={openGallery}><Text>Choose image from gallery</Text></TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
                <TouchableOpacity onPress={openCamera}><Text>Open camera</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        padding: 20
    }
});

export default UploadFile
