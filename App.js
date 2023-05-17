import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from 'pages/main'
import Score from 'pages/score'
import Camera from 'pages/camera'
import Upload from 'pages/upload'

const Stack = createNativeStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Main'>
				<Stack.Screen
					name='main'
					component={Main}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='score'
					component={Score}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='camera'
					component={Camera}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='upload'
					component={Upload}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App