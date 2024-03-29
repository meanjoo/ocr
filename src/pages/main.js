import React from 'react'
import {
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native'

const Main = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('getImage')}>
				<Image style={styles.img} source={require('assets/img/paper.png')} />
				<Text style={styles.text}>시험지 이미지</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('typeAnswer')}>
				<Image style={styles.img} source={require('assets/img/typeAnswer.png')} />
				<Text style={styles.text}>정답 입력</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	touchContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 35,
	},
	img: {
		width: 100,
		height: 100,
		margin: 15,
	},
	text: {
		fontFamily: 'Pretendard-Bold',
		color: 'cornflowerblue',
		fontSize: 16,
		
	}
})

export default Main