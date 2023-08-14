import React, {useContext, useState} from 'react'
import {
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    SafeAreaView,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native'

const TypeAnswer = ({navigation}) => {
    const [tableData, setTableData] = useState([])
    const [answerName, setAnswerName] = useState("")
    const [numRows, setNumRows] = useState(-1)
    const [numCols, setNumCols] = useState(-1)
    const [points, setPoints] = useState(-1)
    const [textData, setTextData] = useState("")

    const handleInputChange = (text, rowIndex, cellIndex) => {
        const dataCopy = [...tableData]
        dataCopy[rowIndex][cellIndex] = text
        setTableData(dataCopy)
    }

    const generateTable = () => {
        const data = []
        for (let i = 0; i < numRows; i++) {
          const row = []
          for (let j = 0; j < numCols; j++) {
            row.push("")
          }
          data.push(row)
        }
        setTableData(data)
    }

    const makeAlert = (text) => {
        return (
            Alert.alert(
                text, "", [
                    {
                        text: "확인",
                        onPress: () => {}
                    }
                ],
            )
        )
    }

    const handleSave = () => {
        console.log('click save')

        if (answerName === "") {
            makeAlert("시험 이름을 입력하세요.")
        }

        else if (numRows == -1 || numCols == -1) {
            makeAlert("표의 크기를 입력하세요.")
        }

        else if (points == -1) {
            makeAlert("문항 당 배점을 입력하세요.")
        }

        else if (tableData.length == 0) {
            makeAlert("표를 생성하세요.")
        }

        else if (textData === "") {
            makeAlert("서술형 답안을 입력하세요.")
        }

        else {
            numbers = []

            for(let i=0; i<numRows*numCols; i++) {
                numbers[i] = ''
            }
            for(let i=0; i<numRows; i++) {
                for(let j=0; j<numCols; j++) {
                    numbers[numRows*j + i] = tableData[i][j]
                }
            }

            fetch('http://localhost:8000/typeAnswer/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": answerName,
                    "tableRows": numRows,
                    "tableCols": numCols,
                    "numbers": numbers,
                    "points": points,
                    "text": textData,
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
                Alert.alert(
                    "답안이 저장되었습니다!", "", [
                        {
                            text: "확인",
                            onPress: () => navigation.navigate('main')
                        }
                    ],
                )
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    return(
        <SafeAreaView style={{ flex: 1 }}>
            {/* 고정된 요소 */}
            <View style={{height: 80}}>
                <Text style={styles.title}>답안 입력 페이지</Text>
            </View>

            {/* 스크롤 영역 */}
            <ScrollView style={{ flex: 1 }}>
                {/* 스크롤 가능한 컨텐츠 */}
                <View style={{ height: 1000 }}>
                    <View style={styles.container}>
                        <Text style={styles.labelText}>이름 : </Text>
                        <TextInput style={{ color: 'black' }}
                            onChangeText={(text) => setAnswerName(text)}
                            placeholder="시험 이름을 입력하세요."
                            placeholderTextColor = "#666666"
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.labelText}>행 : </Text>
                        <TextInput style={{ color: 'black' }}
                            onChangeText={(text) => setNumRows(text)}
                            placeholder="행 크기를 입력하세요."
                            placeholderTextColor = "#666666"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.labelText}>열 : </Text>
                        <TextInput style={{ color: 'black' }}
                            onChangeText={(text) => setNumCols(text)}
                            placeholder="열 크기를 입력하세요."
                            placeholderTextColor = "#666666"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.labelText}>문항 당 배점 : </Text>
                        <TextInput style={{ color: 'black'}}
                            onChangeText={(text) => setPoints(text)}
                            placeholder="문항 당 배점을 입력하세요."
                            placeholderTextColor = "#666666"
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={generateTable}>
                        <Text style={styles.buttonText}>표 만들기</Text>
                    </TouchableOpacity>

                    <View style={styles.table}>
                        {tableData.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map((cell, cellIndex) => (
                                    <TextInput
                                        key={cellIndex}
                                        style={styles.cellInput}
                                        value={cell}
                                        onChangeText={(text) => handleInputChange(text, rowIndex, cellIndex)}
                                        keyboardType='numeric'
                                    />
                                ))}
                            </View>
                        ))}
                    </View>

                    <View styles={styles.container2}>
                        <Text style={[styles.labelText, {marginLeft: 15}]}>서술형</Text>
                        <TextInput
                            onChangeText={(text) => setTextData(text)}
                            style={styles.textContainer}
                            multiline
                        />
                    </View>

                </View>
            </ScrollView>

            {/*고정된 요소*/}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>저장하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft : 15, // 오른쪽으로 15px 이동
      marginBottom : 5
    },
    container2: {
        padding: 10,
        marginBottom: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
		fontFamily: 'Pretendard-ExtraBold',
        padding: 20,
        color : "#6495ED",
        fontSize: 30,
        margin : 'auto',
        textAlign : "center",
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      alignSelf : 'center',
      backgroundColor: '#6495ED',
      width : '95%',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    labelText: {
        color : '#6495ED', 
        fontSize : 20,
        fontFamily: 'Pretendard-SemiBold',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Pretendard-SemiBold',
        textAlign: 'center',
    },
    table: {
      //borderWidth: 1,
      //borderColor: 'black',
      padding: 10,
    },
    row: {
      color : 'black',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    cellInput: {
      flex: 1,
      textAlign: 'center',
      color : 'black',
      borderWidth: 1,
      borderColor: 'black',
      padding: 1,
    },
    textContainer: {
        height: 280, 
        color : 'black',
        borderColor: 'black', 
        borderWidth: 2, 
        marginTop: 5,
        marginBottom: 8,
        marginLeft: 15,
        marginRight: 15,
        // margin 한 번에 할 수 없나?
    },
});

export default TypeAnswer