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
			<TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('camera')}>
				<Image style={styles.img} source={require('assets/img/camera.png')} />
				<Text style={styles.text}>카메라로 사진 찍기</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.touchContainer} onPress={() => navigation.navigate('upload')}>
				<Image style={styles.img} source={require('assets/img/upload.png')} />
				<Text style={styles.text}>이미지 파일 업로드</Text>
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