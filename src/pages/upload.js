import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

import { launchImageLibrary } from 'react-native-image-picker'

const Upload = ({ navigation }) => {
    const [imageSource, setImageSource] = useState()
    const options = {
        title: 'Load Photo',
        customButtons: [
            { name: 'button_id_1', title: 'CustomButton 1' },
            { name: 'button_id_2', title: 'CustomButton 2' }
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    }

    const showImagePicker = () => {
        launchImageLibrary(options, (response) => {
            if (response.error) {
                console.error('LaunchImageLibrary Error: ', response.error)
            }
            else if (response.didCancel) {
                navigation.navigate('main')
            }
            else {
                setImageSource(response.assets[0].uri)
                console.log(response.assets[0].uri)
            }
        })
    }

    useEffect(() => {
        console.log('앨범 실행')
        showImagePicker()
    }, [])

    if (imageSource) {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={{flex: 1, resizeMode: 'contain'}} source={{uri: imageSource}} />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>Not Found</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Upload