import React from 'react'
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native'

let score = 70;

const Score = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titleText}>시험지 채점 결과는?</Text>
			<Text style={styles.scoreText}>{score}/100점입니다</Text>
			
				<Text style={styles.resultText}>1. O</Text>
				<Text style={styles.resultText}>2. X</Text>
				<Text style={styles.resultText}>3. O</Text>
				<Text style={styles.resultText}>4. O</Text>
				<Text style={styles.resultText}>5. O</Text>
				<Text style={styles.resultText}>6. O</Text>
				<Text style={styles.resultText}>7. O</Text>
				<Text style={styles.resultText}>8. O</Text>
				<Text style={styles.resultText}>9. O</Text>
				<Text style={styles.resultText}>10. O</Text>
				
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 30,
	},
	titleText: {
		fontFamily: 'Pretendard-ExtraBold',
		color: '#333',
		fontSize: 26,
	},
	scoreText: {
		fontFamily: 'Pretendard-ExtraBold',
		color: 'cornflowerblue',
		fontSize: 35,
		marginBottom: 10,
	},
	resultText: {
		fontFamily: 'Pretendard-Regular',
		color: '#000',
		fontSize: 22,
		marginTop: 12,
	},
})

export default Score