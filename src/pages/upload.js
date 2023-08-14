import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

import { launchImageLibrary } from 'react-native-image-picker'

const Upload = ({ navigation }) => {
    const [imageSource, setImageSource] = useState()
    const [image, setImage] = useState()

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
                navigation.navigate('getImage')
            }
            else {
                setImageSource(response.assets[0].uri)
                setImage(response.assets[0])
                // console.log(response)
                // console.log('uri', response.assets[0].uri)

            }
        })
    }

    // const pressOk = async () => {
    const pressOk = () => {
        console.log('click ok')
        console.log(image)
        
        const formdata = new FormData()
        formdata.append('file', {
            uri: image.uri,
            type: image.type,
            name: image.fileName
        })

        console.log(formdata)
        console.log(formdata['_parts'])

        // 원랜 여기서 서버에 이미지 저장하고 그 뒤에 selectPaper로 넘어가는 거
        // let res = await fetch(
        //     'http://localhost:8000/uploadImage/', {
        //         method: 'post',
        //         body: formdata,
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //     }
        // )
        // let responseJson = await res.json()
        // console.log(responseJson, "responseJson")

        navigation.navigate('selectPaper')
    }

    useEffect(() => {
        console.log('앨범 실행')
        showImagePicker()
    }, [])

    if (imageSource) {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={{flex: 1, resizeMode: 'contain'}} source={{uri: imageSource}} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => showImagePicker()}>
                        <Text style={styles.buttonText}>다시 선택하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => pressOk()}>
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems : 'center',
    },
    button: {
        backgroundColor: '#6495ED',
        margin : 35,
        padding: 20,
        borderRadius : 5,
        marginBottom: 46,
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
})

export default Upload