import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

const Camera = () => {

    if (device == null) return <ActivityIndicator />
    return (
        <SafeAreaView>
            <Text>Camera</Text>
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