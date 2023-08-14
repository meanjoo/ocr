import React, {useEffect, useState} from 'react'
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	FlatList,
	ScrollView,
} from 'react-native'

import Marking from 'pages/marking'

const ScoreTemp = () => {
    const [isMarking, setisMarking] = useState(true)
	const [score, setScore] = useState(0)
	const [totalScore, setTotalScore] = useState(0)
	const [numberResult, setNumberResult] = useState()
	const [inferenceWord, setInferenceWord] = useState()
	const [answerText, setAnswerText] = useState()

    useEffect(() => {
        fetch('http://localhost:8000/marking/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": "test name"
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                throw res.json()
            }
        })
        .then(json => {
            console.log('json', json) // json은 서버에서 받아온 데이터
			setNumberResult(json.numberResult.split(""))
			setScore(json.score)
			setTotalScore(json.totalScore)
			setInferenceWord(json.inferenceWord)
			setAnswerText(json.text)
            setisMarking(false)
        })
        .catch(error => {
            console.log(error)
        })
    }, []) // 빈 배열을 전달하여 처음 마운트될 때만 실행

    if (isMarking) {
        return (
            <Marking />
        )
    }

    else {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.titleText}>채점 결과</Text>

				<Text style={styles.scoreText}>나의 점수는 : <Text style={{color: 'red'}}>{score}</Text>/{totalScore}</Text>

				<View style={styles.scoreContainer}>
					{numberResult.map((item, index) => (
						<Text key={index}>{index+1}. {item}</Text>
					))}
				</View>

				<Text style={styles.textText}>서술형</Text>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					{/* <Text>{answerText}</Text> */}

					{inferenceWord.map((item, index) => (
						<Text key={index}>{item} </Text>
					))}
				</ScrollView>				

			</SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 30,
	},
	titleText: {
		fontFamily: 'Pretendard-ExtraBold',
        color : "#6495ED",
        textAlign : "center",
		fontSize: 30,
		marginBottom: 10,
	},
	scoreContainer: {
		marginBottom: 10,
	},
	scoreText: {
		fontFamily: 'Pretendard-ExtraBold',
		fontSize: 18,
	},
	resultText: {
		fontFamily: 'Pretendard-Regular',
		color: '#000',
		fontSize: 22,
		marginTop: 12,
	},
	scrollContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	textText: {
		fontSize: 18,
        color : "#6495ED",
	}
})

export default ScoreTemp