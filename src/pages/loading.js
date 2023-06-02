import React from 'react'
import {
    SafeAreaView,
    ActivityIndicator,
    Text,
} from 'react-native'

const Loading = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ActivityIndicator size='large' color='#6495ED' />
            <Text style={{fontFamily: 'Pretendard-Bold', fontSize: 18, color: '#6495ED', marginTop: 24, }}>로딩중입니다...</Text>
        </SafeAreaView>
    )
}

export default Loading