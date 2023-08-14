import React, {useEffect, useState} from 'react'
import { 
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native'

import Loading from 'pages/loading'

const SelectPaper = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedValue, setSelectedValue] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [paperList, setPaperList] = useState()
    
    const pressOk = () => {
        console.log("선택 완료 버튼")

        // 여기서 선택한 거랑 같이 서버로 가야함
        if (!selectedValue) {
            return (
                Alert.alert(
                    "채점할 시험지의 답안을 선택해주세요.", "", [
                        {
                            text: "확인",
                            onPress: () => {}
                        }
                    ],
                )
            )
        }
        else {
            navigation.navigate('score')
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const pressList = (value) => {
        setSelectedValue(value)
        setIsOpen(false)
    }

    useEffect(() => {
        fetch('http://localhost:8000/getPaperList/', {
            method: 'get',
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
            setPaperList(json.list)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
        })

    }, [])

    if (isLoading) {
        return(
            <Loading />
        )
    }
    else {
        return (
            <SafeAreaView style={{flex:1}}>
                <View>
                    <Text style={styles.title}>답안 선택</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.dropdownBox} onPress={ toggleDropdown }>
                        <Text>{selectedValue || "채점할 시험지의 답안을 선택하세요."}</Text>
                    </TouchableOpacity>

                    {isOpen && (
                        <View>
                            {paperList.map((item, index) => (
                                item !== '' && (
                                    <TouchableOpacity key={index} style={styles.dropdownList} onPress={() => pressList(item)}>
                                        <Text style={styles.dropdownListText}>➡   {item}</Text>
                                    </TouchableOpacity>
                                )
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('typeAnswer')} }>
                        <Text style={styles.buttonText}>답안 추가하기</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.button} onPress={ pressOk }>
                        <Text style={styles.buttonText}>선택 완료</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        padding: 20,
        color : "#6495ED",
        fontSize: 30,
        margin : 'auto',
        textAlign : "center",
		fontFamily: 'Pretendard-ExtraBold',
    },
    button: {
        alignSelf : 'center',
        backgroundColor: '#6495ED',
        width : '95%',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      buttonText: {
        color: 'white',
        fontSize : 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      dropdownBox: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        width : '95%',
        alignSelf: 'center',
      },
      dropdownList: {
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        paddingLeft: 20,
        width : '95%',
        alignSelf: 'center',
      },
      dropdownListText: {
        fontSize: 18,
      },
})

export default SelectPaper