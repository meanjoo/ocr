import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
} from 'react-native'

import { launchCamera } from 'react-native-image-picker'
import Loading from 'pages/loading'

const Camera = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [imageSource, setImageSource] = useState()
    const options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    }

    const showCamera = () => {
        launchCamera(options, (response) => {
            if (response.error) {
                console.error('LaunchCamera Error: ', response.error)
            }
            else if (response.didCancel) {
                navigation.navigate('getImage')
            }
            else {
                setImageSource(response.assets[0].uri)
                setLoading(true)
                navigation.navigate('score')
                /**
                 * 서버로 이미지 전송
                 * 서버에서 파이썬 스크립트 실행
                 * 리턴값 반환
                 */
            }
        })
    }

    useEffect(() => {
        console.log('카메라 실행')
        showCamera()
    }, [])

    if (isLoading) {
        return <Loading />
    }
    if (imageSource) {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={{ flex: 1, resizeMode: 'contain' }} source={{ uri: imageSource }} />
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

export default Camera